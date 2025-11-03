import mongoose from "mongoose"

const investmentSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now}
})

export default mongoose.model("Investment", investmentSchema);