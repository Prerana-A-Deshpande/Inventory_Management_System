import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

//Get profit/loss report
router.get("/profit-loss", async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          totalSales: { $sum: "$totalAmount" },
          totalProfit: { $sum: "$profit" }
        }
      },
      {
        $project: {
          _id: 1,
          totalSales: 1,
          totalProfit: 1,
          totalPurchase: { $subtract: ["$totalSales", "$totalProfit"] } // ✅ purchase = sales - profit
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format output for frontend
    const formatted = data.map(item => ({
      date: item._id,
      totalSales: item.totalSales,
      totalPurchase: item.totalPurchase,
      profitLoss: item.totalProfit
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching profit/loss:", error);
    res.status(500).json({ message: "Error generating profit/loss report" });
  }
});

export default router;
