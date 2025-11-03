import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
    product:{type: mongoose.Schema.Types.ObjectId, ref: "Product", required:true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true}
})

const orderSchema = new mongoose.Schema({
    customer: {type:mongoose.Schema.Types.ObjectId, ref: "Customer", required:true},
    items: [orderItemSchema],
    totalAmount: {type: Number, required:true},
    profit: { type: Number, default: 0 },
    orderDate: {type:Date, default: Date.now}
}, { timestamps: true })

export default mongoose.model("Order", orderSchema)