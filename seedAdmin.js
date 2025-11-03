import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const existingAdmin = await User.findOne({ email: "admin@example.com" });
        if (existingAdmin) {
            console.log("Admin already exists!")
            process.exit();
        }
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const admin = new User({
            name: "Inventory Admin",
            email: "adminadmin@gmail.com",
            password: hashedPassword,
            role: "admin"
        })
        await admin.save();
        console.log("admin user created successfully!")
        process.exit();
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
}

seedAdmin();