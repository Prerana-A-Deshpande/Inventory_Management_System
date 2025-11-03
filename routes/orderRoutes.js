import express from "express"
import Order from "../models/Order.js"
import Customer from "../models/Customer.js"
import Product from "../models/Product.js"

const router = express.Router()

//creating a new bill
router.post("/", async (req, res) => {
    try {
        const { name, phone, items } = req.body;

        //finding or creating customer
        let customer = await Customer.findOne({ phone })
        if (!customer) {
            customer = new Customer({ name, phone });
            await customer.save();
        }
        //prepare order items and calculating total
        let totalAmount = 0;
        let totalProfit = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId)
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            const sellingPrice = product.pricePerUnit * item.quantity;
            const purchaseCost = product.purchaseCost * item.quantity;
            const profit = sellingPrice - purchaseCost;

            totalAmount += sellingPrice;
            totalProfit += profit;

            // const price = product.pricePerUnit * item.quantity;
            // totalAmount += price;
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.pricePerUnit
            })

            //reducing stocks
            product.quantityAvailable -= item.quantity;
            await product.save();
        }

        //create order
        const order = new Order({
            customer: customer._id,
            items: orderItems,
            totalAmount,
            profit: totalProfit
        });
        await order.save();
        //populating before sending response
        const saveOrder = await Order.findById(order._id)
            .populate("customer", "name phone")
            .populate("items.product", "name pricePerUnit unit")
        res.status(201).json(saveOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
})

//get all orders(for admin)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("customer", "name phone")
            .populate("items.product", "name category pricePerUnit unit");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
})


export default router;