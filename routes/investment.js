import express from "express"
import Investment from "../models/Investment.js"
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import StoreOrder from "../models/StoreOrder.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const investments = await Investment.find().sort({ date: -1 });
        const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
        res.json({ investments, totalInvestment });
    } catch (error) {
        res.status(500).json({ message: "Error fetching investment", error });
    }
})

router.post("/set", async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) return res.status(400).json({ message: "Investment amount required" })
        const investment = new Investment({ amount });
        await investment.save();
        res.json({ message: "Initial investment recorded successfully", investment });
    } catch (error) {
        res.status(500).json({ message: "Error saving investment", error });
    }
})



router.get("/calculate-purchase", async (req, res) => {
    try {
        const products = await Product.find();
        let totalPurchaseAmount = 0;
        products.forEach(p => {
            totalPurchaseAmount += (p.purchaseCost || 0) * (p.quantityAvailable || 0)
        });
        const investment = await Investment.findOneAndUpdate({}, { $set: { totalPurchaseAmount } }, { new: true, upsert: true });
        res.json({ message: "Total purchase amount calculated successfully", totalPurchaseAmount, investment });
    } catch (error) {
        res.status(500).json({ message: "Error calculating total purchase amount", error });
    }
})

router.get("/calculate-sales", async (req, res) => {

    try {
        const bills = await Order.find();
        const totalSalesAmount = bills.reduce((sum, bill) => sum + (bill.totalAmount || 0), 0)

        const investment = await Investment.findOneAndUpdate({}, { $set: { totalSalesAmount } }, { new: true, upsert: true });
        res.json({ message: "Total sales amount calculated successfully", totalSalesAmount, investment })
    } catch (error) {
        res.status(500).json({ message: "Error calculating total sales", error });
    }
})

router.get("/calculate-restock", async (req, res) => {
    try {
        const orders = await StoreOrder.find().populate("productId")
        let totalRestockAmount = 0;
        orders.forEach(order => {
            totalRestockAmount += (order.productId?.purchaseCost || 0) * (order.quantity || 0);
        })
        const investment = await Investment.findByIdAndUpdate({}, { $set: { totalRestockAmount } }, { new: true, upsert: true });
        res.json({ message: "Total restock amount calculated successfully", totalRestockAmount, investment })
    } catch (error) {
        res.status(500).json({ message: "Error calculating restock amount", error });
    }
})

router.get("/summary", async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const investments = await Investment.find();
        const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);

        // Calculate total purchase amount
        const purchaseCost = await Product.find();
        const totalPurchaseAmount = purchaseCost.reduce((sum, item) => sum + (item.purchaseCost || 0), 0);

        // Calculate total restock cost
        const restocks = await StoreOrder.find();
        const totalRestockAmount = restocks.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        // Calculate total sales amount
        const sales = await Order.find();
        const totalSalesAmount = sales.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

        // Profit or Loss
        const profitOrLoss = totalSalesAmount - (totalPurchaseAmount + totalRestockAmount);

        //Today's stats
        const todaysRestocks = await StoreOrder.find({ createdAt: { $gte: today } });
        const todaysSales = await Order.find({ createdAt: { $gte: today } });
        const todaysPurchases = await Order.find({ createdAt: { $gte: today } });

        const todaysPurchaseCost = todaysPurchases.reduce((sum, i) => sum + (i.totalAmount || 0), 0);
        const todaysRestock = todaysRestocks.reduce((sum, i) => sum + (i.totalAmount || 0), 0);
        const todaysSalesCost = todaysSales.reduce((sum, i) => sum + (i.totalAmount || 0), 0);
        const todaysProfit = todaysSalesCost - (todaysPurchaseCost + todaysRestock);
        // console.log("todaysPurchases array:", todaysPurchases); 
        // console.log("Calculated todaysPurchaseCost:", todaysPurchaseCost); 

        res.json({
            totalInvestment, totalPurchaseAmount, totalRestockAmount, totalSalesAmount, profitOrLoss,
            todaysPurchaseCost, todaysRestock, todaysSalesCost, todaysProfit, message: profitOrLoss >= 250 ? "Profit" : "Loss",
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching summary", error });
    }
})

export default router;