import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

//get all categories

router.get("/", async(req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.post("/", async (req, res) => {
  try {
    const { name, shelfLife } = req.body;

    if (!name || !shelfLife) {
      return res.status(400).json({ message: "Name and shelfLife are required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, shelfLife });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error: error.message });
  }
});

//delete a category
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;