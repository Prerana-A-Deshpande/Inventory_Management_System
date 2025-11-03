import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

//get all staff
router.get("/staffs", authMiddleware(["admin"]), async(req, res) => {
    try {
        const staffs = await User.find({role: "staff"});
        res.json(staffs)
    } catch (error) {
        res.status(500).json({ message: "Error fetching staff", error: error.message });
    }
})

//admin adding staffs
router.post("/add-staff", authMiddleware(["admin"]), async(req, res) => {
    try {
        const {name,email, password, role} = req.body;

        //checking whether the staff already exists
        const existing = await User.findOne({email})
        if(existing){
            return res.status(400).json({message: "Staff already exists!"})
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new staff
        const newStaff = new User({
            name, email, password:hashedPassword, role: role || "staff",
        })
        await newStaff.save();
        res.status(201).json({ message: "Staff added successfully", staff: newStaff });
    } catch (error) {
        res.status(500).json({ message: "Error adding staff", error: error.message });
    }
})

router.put("/staff/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let updateData = { name, email };

    // If password was changed, hash it
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const updatedStaff = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json({ message: "Staff updated successfully", updatedStaff });
    
  } catch (error) {
    res.status(500).json({ message: "Error updating staff", error: error.message });
  }
});

router.delete("/staffs/:id", authMiddleware(["admin"]), async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting staff", error: error.message });
    }
})

export default router;