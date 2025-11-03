import mongoose from "mongoose";

// const storeOrderSchema = new mongoose.Schema({
//     store: {type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true},
//     product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
//     quantity: {type: Number, required: true},
//     status: {type: String, enum: ["Pending", "Received"], default: "Pending"},
// }, {timestamps: true})

const storeOrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  quantity: { type: Number, required: true },
  unit:String,
  totalAmount: Number,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled", "Dispatched", "Delivered"],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["Unpaid", "COD", "Online", "Received"],
    default: "Unpaid",
  },
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("StoreOrder", storeOrderSchema);
