import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import storeRoutes from "./routes/storeRoutes.js"
import profitLossRoutes from "./routes/profitlossRoutes.js"
import whatsapp from "./routes/whatsapp.js"
import imgbbRoutes from "./routes/imgbb.js"
import supplierRoutes from "./routes/supplyRoutes.js"
// import reorderRoutes from "./routes/reorderRoutes.js"
import investmentRoutes from "./routes/investment.js"

dotenv.config();
const app = express();

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb", extended: true}))
app.use(cors());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/reports", reportRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/whatsapp", whatsapp);
app.use("/api/imgbb", imgbbRoutes);
app.use("/api/stores", storeRoutes)
app.use("/api/profitloss", profitLossRoutes);
app.use("/api/suppliers", supplierRoutes);
// app.use("/api/reorders", reorderRoutes);
app.use("/api/investments", investmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));