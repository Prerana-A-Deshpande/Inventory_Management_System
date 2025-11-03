import express from "express"
import Product from "../models/Product.js"
// import Category from "../models/Category.js"
import StoreOrder from "../models/StoreOrder.js"
import Order from "../models/Order.js";

const router = express.Router();

//stocks grouped by category
router.get("/stock-by-category", async (req, res) => {
    try {
        const report = await Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: "$categoryDetails" },
            {
                $group: {
                    _id: "$categoryDetails.name",
                    totalQuantity: { $sum: "$quantityAvailable" },
                    totalValue: { $sum: { $multiply: ["$quantityAvailable", "$pricePerUnit"] } },
                    items: {
                        $push: {
                            name: "$name",
                            quantity: "$quantityAvailable",
                        },
                    },
                }
            },
            { $sort: { totalQuantity: -1 } }
        ])
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: "Error generating report", error: error.message });
    }
})

//get number of restock orders grouped by date
router.get("/orders-stats", async (req, res) => {
    try {
        const stats = await StoreOrder.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(stats);
    } catch (error) {
        console.log("Error reportRoutes");
        res.status(500).json({ message: "Error fetching order stats", error });
    }
})

//daily sales report
router.get("/daily-sales-reports", async (req, res) => {
    try {
        const report = await Order.aggregate([
            {
                $unwind: "$items",
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    totalItemsSold: { $sum: "$items.quantity" },
                    totalAmount: { $sum: "$totalAmount" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        res.json(report);
        console.log("Daily report data:", report);
    } catch (error) {
        console.error("Error generating reports ", error);
        res.status(500).json({ message: "Error generating reports", error: error });
    }
})

export default router;