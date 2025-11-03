import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name : {type:String, required: true, unique: true},
    shelfLife: {type:Number, required: true}
}, {timestamps: true});

export default mongoose.model("Category", categorySchema)