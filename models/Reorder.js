// import mongoose from "mongoose"

// const reorderSchema = new mongoose.Schema({
//     productId:{type:mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
//     productName:{type:String, required: true},
//     quantityRequested:{type:Number, required:true},
//     supplierId:{type:mongoose.Schema.Types.ObjectId, ref:"Supplier", required:true},
//     status:{type:String, enum:["Pending","Approved","Dispatched","Delivered"]},
//     dateRequested:{type:Date,default:Date.now},
// },{timestamps: true});

// export default mongoose.model("Reorder", reorderSchema);