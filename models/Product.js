import mongoose from 'mongoose';
import Category from '../models/Category.js';

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
    unit: {type:String, required:true},
    pricePerUnit: {type:Number, required:true},
    purchaseCost: { type: Number, required: true, default: 0 },
    quantityAvailable: {type:Number, required:true},
    isDivisible: {type:Boolean, default: true},
    image: {type: String},
    createdAt: { type: Date, default: Date.now },
    expiryDate: {type: Date, required: false}
}, {timestamps: true})

productSchema.pre("save", async function (next) {
  try {
    // Trigger when product is new, category changed, or quantity updated
    if (this.isNew || this.isModified("category") || this.isModified("quantityAvailable")) {
      // Find category in Category collection
      const categoryDoc = await Category.findById(this.category);

      if (categoryDoc && categoryDoc.shelfLife) {
        const daysToAdd = categoryDoc.shelfLife;

        // Set expiryDate = createdAt + shelfLife days
        const expiry = new Date(this.createdAt || Date.now());
        expiry.setDate(expiry.getDate() + daysToAdd);
        this.expiryDate = expiry;
      } else {
        // Default to 30 days if category not found
        const expiry = new Date(this.createdAt || Date.now());
        expiry.setDate(expiry.getDate() + 30);
        this.expiryDate = expiry;
      }
    }
    next();
  } catch (error) {
    console.error("Error calculating expiry date:", error);
    next(error);
  }
});

export default mongoose.model("Product", productSchema)