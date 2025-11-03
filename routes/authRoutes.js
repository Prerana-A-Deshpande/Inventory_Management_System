import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

const router = express.Router();

// admin-login
router.post("/login", async(req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User not found!"})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid Credentials!"})
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        res.json({ message: "Login successful", token, role:user.role});
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message})
    }
})

export default router;