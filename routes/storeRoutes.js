import express from "express";
import Store from "../models/Store.js";

const router = express.Router();

//create a new store
router.post("/", async(req, res) => {
    try {
        const store = new Store(req.body);
        await store.save();
        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ message: "Error creating store", error });
    }
})

//get all stores
router.get("/", async(req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        res.status(500).json({message: "Error fetching stores", error});
    }
})

export default router;