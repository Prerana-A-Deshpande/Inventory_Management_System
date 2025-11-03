import mongoose from "mongoose"

const supplierSchema = new mongoose.Schema({
    supplierName: { type: String, required: true, trim: true },
    contact: { type: String, required: true },
    email: { type: String, trime: true },
    address: { type: String, trim: true },
    productsSupplied: { type: [String], default: [] },
    password: { type: String, required: true },
    role: { type: String, default: "supplier" }
    // rating: { type: Number, default: 5, }
}, { timestamps: true })

export default mongoose.model("Supplier", supplierSchema);