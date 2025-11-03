// import express from "express"
// import Reorder from "../models/Reorder.js"
// import Product from "../models/Product.js"
// import Supplier from "../models/Supplier.js"

// const router = express.Router();

// router.post("/auto", async(req, res) => {
//     try {
//         const lowStockProducts = await Product.find({quantityAvailable: {$lt: 11}});
//         if(lowStockProducts.length === 0){
//             return res.json({message: "No products need reordering"})
//         }
//         const reorders = [];
//         for(let product of lowStockProducts){
//             const supplier = await Supplier.findOne({productsSupplied: product.name});

//             if(supplier){
//                 const reorder = new Reorder({
//                     productId:product._id,
//                     productName:productName,
//                     quantityRequested: 50,
//                     supplierId: supplier._id,
//                 })
//                 await reorder.save();
//                 reorders.push(reorder);
//             }
//         }    
//         res.json({message:"Reorders generated", reorders});
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })

// //get all reorders requests
// router.get("/", async(req, res) => {
//     try {
//         const reorders = await Reorder.find()
//         .populate("supplierId", "supplierName contact")
//         .populate("productId", "name category");
//         res.json(reorders);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })



// export default router;