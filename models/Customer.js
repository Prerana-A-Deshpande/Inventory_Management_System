import mongoose from "mongoose"
const customerSchema = new mongoose.Schema({
    name: {type:String, required:true},
    phone: {type: String, unique:true, required: true},
}, {timestamps: true})

export default mongoose.model("Customer", customerSchema)