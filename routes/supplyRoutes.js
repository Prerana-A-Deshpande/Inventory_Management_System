import express from "express"
import Supplier from "../models/Supplier.js"
import StoreOrder from "../models/StoreOrder.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import Product from "../models/Product.js";

const router = express.Router();

// Getting all orders for a supplier
router.get("/restock/:supplierId", async (req, res) => {
    try {
        const orders = await StoreOrder.find({ supplierId: req.params.supplierId })
            .populate("productId supplierId");
        console.log("SupplierId:", req.params.supplierId);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this supplier" });
        }
        // console.log("Sample order:", orders[0]?.totalAmount);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching supplier orders", error });
    }
});

// Updating order status
router.put("/restock/update-status/:orderId", async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["Pending", "Approved", "Cancelled", "Dispatched", "Delivered"];

        if (!validStatuses.includes(status))
            return res.status(400).json({ message: "Invalid order status" });

        const order = await StoreOrder.findById(req.params.orderId).populate("productId");

        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        // Automatically update stock if delivered
        if (status === "Delivered") {
            order.productId.quantityAvailable += order.quantity;
            await order.productId.save();
        }

        res.json({ message: `Order ${status}`, order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
});

// Admin paying supplier
router.put("/restock/:orderId/pay", async (req, res) => {
    try {
        const { method } = req.body; // 'COD' or 'Online'
        const order = await StoreOrder.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.paymentStatus !== "Unpaid") {
            return res.status(400).json({ message: "Payment already done" });
        }

        if (method === "COD") {
            order.paymentStatus = "COD";
            await order.save();
            return res.json({ message: "COD payment done", order });
        }
        else if (method === "Online") {
            order.paymentStatus = "Online"; // mark as processing
            await order.save();

            // simulate 6 seconds online payment processing
            setTimeout(async () => {
                const updatedOrder = await StoreOrder.findById(req.params.orderId);
                updatedOrder.paymentStatus = "Received"; // online payment received
                await updatedOrder.save();
            }, 6000);

            return res.json({ message: "Online payment processing", order });
        } else {
            return res.status(400).json({ message: "Invalid payment method" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error processing payment", error });
    }
});



// //Adding suppliers
// router.post("/", async (req, res) => {
//     try {
//         const { supplierName, contact, email, address, productsSupplied, rating } = req.body;

//         //preventing duplicated
//         const existing = await Supplier.findOne({ supplierName });
//         if (existing) {
//             return res.status(400).json({ message: "Supplier already exists!" });
//         }
//         const supplier = new Supplier({ supplierName, contact, email, address, productsSupplied, rating });
//         await supplier.save();
//         res.status(201).json(supplier);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

//get all suppliers
router.get("/", async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//delete supplier
router.delete("/:id", async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: "Supplier deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Register Supplier
router.post("/register", async (req, res) => {
    try {
        const { supplierName, contact, email, address, password } = req.body;

        const existing = await Supplier.findOne({ email });
        if (existing) return res.status(400).json({ message: "Supplier already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const supplier = new Supplier({
            supplierName,
            contact,
            email,
            address,
            role: "supplier",
            password: hashedPassword,
        });

        await supplier.save();
        res.json({ message: "Supplier registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
});

// Supplier Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const supplier = await Supplier.findOne({ email });
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });

        const isMatch = await bcrypt.compare(password, supplier.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: supplier._id, role: supplier.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ message: "Login successful", token, supplier });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;