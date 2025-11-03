import express from "express"
import Product from "../models/Product.js"
import Category from "../models/Category.js"
import StoreOrder from "../models/StoreOrder.js";
import Supplier from "../models/Supplier.js";

const router = express.Router();

// Check expiry and update stock
router.put("/check-expiry", async (req, res) => {
    try {
        const today = new Date();
        //fetching all products
        const products = await Product.find()
        let updateCount = 0;
        for (const product of products) {
            if (product.expiryDate) {
                const diffTime = product.expiryDate - today;
                const daysLeft = diffTime / (1000 * 60 * 60 * 24);

                //if 3days or less left to expire stock set to 0
                if (daysLeft <= 3 && product.quantityAvailable > 0) {
                    product.quantityAvailable = 0;
                    await product.save();
                    updateCount++;
                }
            }
        }
        console.log(`${updateCount} products set to 0 stock due to expiry.`);
        res.json({
            message: `${updateCount} products set to 0 stock due to expiry.`,
        });
    } catch (error) {
        console.log("Check-expiry route hit.....error block");
        console.error("Error checking expiry:", error);
        res.status(500).json({ message: "Error checking expiry", error: error.message });
    }
})

//search bar
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            alert("Please enter the valid query!")
            return res.status(400).json({ message: "Search query is required!" })
        }
        const result = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, //means case-insensitive
            ]
        }).populate("category");
    } catch (error) {
        console.error("Search error", error);
        res.status(500).json({ message: "Server error occured during search" });
    }
})

//get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().populate("category", "name")
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get all categories
router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//get products by category
router.get("/category/:id", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id }).populate("category", "name");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        let { name, category } = req.body;

        // Normalize data: trim & standardize casing
        name = name.trim();

        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required." });
        }

        // Case-insensitive duplicate check
        const existingProduct = await Product.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") },
            category
        });

        if (existingProduct) {
            return res.status(400).json({
                message: `Product "${name}" already exists in this category.`
            });
        }

        // Save product only if not duplicate
        const product = new Product({
            ...req.body,
            name, // normalized name
            category, // ensure category saved properly
        });

        await product.save();
        res.status(201).json(product);

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(400).json({ message: error.message });
    }
});


//update the product
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        res.json(updatedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//delete product
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//getting low stocks
router.get("/low-stock", async (req, res) => {
    try {
        const threshold = 10;
        const products = await Product.find({ quantityAvailable: { $lte: threshold } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching low stock products", error });
    }
})


//place restock order
/*router.post("/restock/:id", async (req, res) => {
    try {
        const { quantity, store } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found!" })
        }
        //creating a store order
        const storeOrder = new StoreOrder({
            store, product: product._id, quantity, status: "Pending",
        });
        await storeOrder.save();

        //delivery after a minute
        setTimeout(async () => {
            await StoreOrder.findByIdAndUpdate(storeOrder._id, { status: "Received" });
            product.quantityAvailable += Number(quantity);
            await product.save();
            console.log(`Product ${product.name} restocked by ${quantity} units from store ${store}`);
        }, 60000);
        res.json({ message: "Restock order placed. Stock will update within a minute!", order: storeOrder, })
    } catch (error) {
        res.status(500).json({ message: "Error placing restock order", error });
    }
})*/

// routes/productRoutes.js
router.post("/restock/:id", async (req, res) => {
    try {
        const { quantity, supplierId } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product Not Found!" });

        if (!quantity || quantity <= 10)
            return res.status(400).json({ message: "Invalid quantity" });
        
        if (!supplierId) return res.status(400).json({ message: "Supplier is required" });

        // const supplier = await Supplier.findById(supplierId);
        const purchasePrice = product.purchaseCost;
        if (!purchasePrice)
            return res.status(400).json({ message: "Purchase price missing!" });

        // 💰 Calculate totalAmount
        const totalAmount = purchasePrice * quantity;

        // Create a restock order
        const storeOrder = new StoreOrder({
            productId: product._id,
            supplierId,
            quantity,
            totalAmount,
            status: "Pending",
        });
        await storeOrder.save();

        res.json({ message: "Restock order placed with supplier!", order: storeOrder, });
    } catch (error) {
        console.error("Error in /restock/:id:", error);
        res.status(500).json({ message: "Error placing restock order", error });
    }
});

//getting the statuses of the restock
router.get("/restocking/orders", async (req, res) => {
    try {
        const orders = await StoreOrder.find()
            .populate("productId supplierId")
            .sort({ createdAt: -1 });
        res.json(orders)
    } catch (error) {
        console.error("Error fetching restock orders:", error);
        res.status(500).json({ message: "Error fetching restock orders", error: error.message });
    }
})

export default router;