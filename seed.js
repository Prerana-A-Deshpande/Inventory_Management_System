// import mongoose from "mongoose"
// import dotenv from "dotenv"
// import Product from "./models/Product.js"

// dotenv.config();
// const seedProducts = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         const categoriesData = [
//             { name: "Dairy" },
//             { name: "Biscuits" },
//             { name: "Chocolates" },
//             { name: "Veggies and Fruits" },
//             { name: "Flours" }
//         ]
//         console.log("Connected to mongodb")
//         await Product.deleteMany();
//         const products = {
//             // 🥛 Dairy Products (20)
//             Dairy: [
//                 { name: "Milk (500ml)", category: "Dairy", unit: "litre", pricePerUnit: 25, quantityAvailable: 200, isDivisible: true },
//                 { name: "Milk (1L)", category: "Dairy", unit: "litre", pricePerUnit: 50, quantityAvailable: 150, isDivisible: true },
//                 { name: "Curd (500g)", category: "Dairy", unit: "gram", pricePerUnit: 30, quantityAvailable: 100, isDivisible: true },
//                 { name: "Butter (100g)", category: "Dairy", unit: "gram", pricePerUnit: 45, quantityAvailable: 80, isDivisible: false },
//                 { name: "Cheese Slices (10 pcs)", category: "Dairy", unit: "packet", pricePerUnit: 90, quantityAvailable: 60, isDivisible: false },
//                 { name: "Paneer (200g)", category: "Dairy", unit: "gram", pricePerUnit: 80, quantityAvailable: 90, isDivisible: false },
//                 { name: "Ghee (500ml)", category: "Dairy", unit: "ml", pricePerUnit: 250, quantityAvailable: 70, isDivisible: true },
//                 { name: "Lassi (200ml)", category: "Dairy", unit: "ml", pricePerUnit: 20, quantityAvailable: 100, isDivisible: false },
//                 { name: "Flavoured Milk (200ml)", category: "Dairy", unit: "ml", pricePerUnit: 25, quantityAvailable: 120, isDivisible: false },
//                 { name: "Cream (200ml)", category: "Dairy", unit: "ml", pricePerUnit: 60, quantityAvailable: 50, isDivisible: false },
//                 { name: "Milk Powder (200g)", category: "Dairy", unit: "gram", pricePerUnit: 90, quantityAvailable: 100, isDivisible: false },
//                 { name: "Whipped Cream (250ml)", category: "Dairy", unit: "ml", pricePerUnit: 120, quantityAvailable: 40, isDivisible: false },
//                 { name: "Buttermilk (200ml)", category: "Dairy", unit: "ml", pricePerUnit: 15, quantityAvailable: 90, isDivisible: false },
//                 { name: "Khoa (200g)", category: "Dairy", unit: "gram", pricePerUnit: 70, quantityAvailable: 30, isDivisible: false },
//                 { name: "Chocolate Milk (250ml)", category: "Dairy", unit: "ml", pricePerUnit: 35, quantityAvailable: 60, isDivisible: false },
//                 { name: "Strawberry Milkshake (200ml)", category: "Dairy", unit: "ml", pricePerUnit: 30, quantityAvailable: 80, isDivisible: false },
//                 { name: "Vanilla Ice Cream (500ml)", category: "Dairy", unit: "ml", pricePerUnit: 120, quantityAvailable: 40, isDivisible: false },
//                 { name: "Kesar Pista Ice Cream (500ml)", category: "Dairy", unit: "ml", pricePerUnit: 150, quantityAvailable: 30, isDivisible: false },
//                 { name: "Fresh Cream (1L)", category: "Dairy", unit: "litre", pricePerUnit: 200, quantityAvailable: 20, isDivisible: true },
//                 { name: "Shreekhand (250g)", category: "Dairy", unit: "gram", pricePerUnit: 60, quantityAvailable: 50, isDivisible: false },
//             ],
//             // 🍪 Biscuits (20)
//             Biscuits: [
//                 { name: "Parle-G (100g)", category: "Biscuits", unit: "packet", pricePerUnit: 10, quantityAvailable: 300, isDivisible: false },
//                 { name: "Oreo (120g)", category: "Biscuits", unit: "packet", pricePerUnit: 30, quantityAvailable: 200, isDivisible: false },
//                 { name: "Hide & Seek (100g)", category: "Biscuits", unit: "packet", pricePerUnit: 25, quantityAvailable: 150, isDivisible: false },
//                 { name: "Good Day (200g)", category: "Biscuits", unit: "packet", pricePerUnit: 40, quantityAvailable: 100, isDivisible: false },
//                 { name: "Bourbon (150g)", category: "Biscuits", unit: "packet", pricePerUnit: 35, quantityAvailable: 120, isDivisible: false },
//                 { name: "Jim Jam (150g)", category: "Biscuits", unit: "packet", pricePerUnit: 30, quantityAvailable: 80, isDivisible: false },
//                 { name: "Marie Gold (250g)", category: "Biscuits", unit: "packet", pricePerUnit: 45, quantityAvailable: 150, isDivisible: false },
//                 { name: "Milk Bikis (200g)", category: "Biscuits", unit: "packet", pricePerUnit: 30, quantityAvailable: 120, isDivisible: false },
//                 { name: "50-50 (100g)", category: "Biscuits", unit: "packet", pricePerUnit: 20, quantityAvailable: 200, isDivisible: false },
//                 { name: "Treat (150g)", category: "Biscuits", unit: "packet", pricePerUnit: 35, quantityAvailable: 100, isDivisible: false },
//                 { name: "Krackjack (100g)", category: "Biscuits", unit: "packet", pricePerUnit: 20, quantityAvailable: 90, isDivisible: false },
//                 { name: "Monaco (75g)", category: "Biscuits", unit: "packet", pricePerUnit: 15, quantityAvailable: 70, isDivisible: false },
//                 { name: "Perk Biscuit (100g)", category: "Biscuits", unit: "packet", pricePerUnit: 25, quantityAvailable: 60, isDivisible: false },
//                 { name: "Digestive Biscuit (200g)", category: "Biscuits", unit: "packet", pricePerUnit: 50, quantityAvailable: 40, isDivisible: false },
//                 { name: "Dark Fantasy Choco Fills (75g)", category: "Biscuits", unit: "packet", pricePerUnit: 40, quantityAvailable: 80, isDivisible: false },
//                 { name: "Tiger Biscuit (100g)", category: "Biscuits", unit: "packet", pricePerUnit: 20, quantityAvailable: 100, isDivisible: false },
//                 { name: "Happy Happy Biscuit (100g)", category: "Biscuits", unit: "packet", pricePerUnit: 25, quantityAvailable: 60, isDivisible: false },
//                 { name: "Little Hearts (50g)", category: "Biscuits", unit: "packet", pricePerUnit: 15, quantityAvailable: 90, isDivisible: false },
//                 { name: "Nice Biscuit (100g)", category: "Biscuits", unit: "packet", pricePerUnit: 20, quantityAvailable: 50, isDivisible: false },
//                 { name: "Butter Cookies (200g)", category: "Biscuits", unit: "packet", pricePerUnit: 60, quantityAvailable: 70, isDivisible: false },
//             ],
//             // 🍫 Chocolates (20)
//             Choclates: [
//                 { name: "Dairy Milk (30g)", category: "Chocolates", unit: "bar", pricePerUnit: 20, quantityAvailable: 200, isDivisible: false },
//                 { name: "Dairy Milk Silk (60g)", category: "Chocolates", unit: "bar", pricePerUnit: 70, quantityAvailable: 150, isDivisible: false },
//                 { name: "KitKat (4 finger)", category: "Chocolates", unit: "bar", pricePerUnit: 25, quantityAvailable: 100, isDivisible: false },
//                 { name: "KitKat (8 finger)", category: "Chocolates", unit: "bar", pricePerUnit: 50, quantityAvailable: 80, isDivisible: false },
//                 { name: "Perk (30g)", category: "Chocolates", unit: "bar", pricePerUnit: 10, quantityAvailable: 120, isDivisible: false },
//                 { name: "Munch (30g)", category: "Chocolates", unit: "bar", pricePerUnit: 10, quantityAvailable: 140, isDivisible: false },
//                 { name: "5 Star (40g)", category: "Chocolates", unit: "bar", pricePerUnit: 20, quantityAvailable: 90, isDivisible: false },
//                 { name: "Bournville (80g)", category: "Chocolates", unit: "bar", pricePerUnit: 100, quantityAvailable: 60, isDivisible: false },
//                 { name: "Toblerone (100g)", category: "Chocolates", unit: "bar", pricePerUnit: 250, quantityAvailable: 40, isDivisible: false },
//                 { name: "Snickers (50g)", category: "Chocolates", unit: "bar", pricePerUnit: 30, quantityAvailable: 90, isDivisible: false },
//                 { name: "Galaxy (40g)", category: "Chocolates", unit: "bar", pricePerUnit: 50, quantityAvailable: 70, isDivisible: false },
//                 { name: "Ferrero Rocher (16 pcs)", category: "Chocolates", unit: "box", pricePerUnit: 500, quantityAvailable: 20, isDivisible: false },
//                 { name: "Milkybar (30g)", category: "Chocolates", unit: "bar", pricePerUnit: 15, quantityAvailable: 110, isDivisible: false },
//                 { name: "Chocopie (6 pcs)", category: "Chocolates", unit: "box", pricePerUnit: 120, quantityAvailable: 50, isDivisible: false },
//                 { name: "Alpenliebe Eclairs (100g)", category: "Chocolates", unit: "packet", pricePerUnit: 40, quantityAvailable: 100, isDivisible: false },
//                 { name: "Pulse Candy (100g)", category: "Chocolates", unit: "packet", pricePerUnit: 30, quantityAvailable: 200, isDivisible: false },
//                 { name: "Gems (50g)", category: "Chocolates", unit: "packet", pricePerUnit: 40, quantityAvailable: 70, isDivisible: false },
//                 { name: "Chocobar Ice Cream (80ml)", category: "Chocolates", unit: "piece", pricePerUnit: 30, quantityAvailable: 60, isDivisible: false },
//                 { name: "M&M’s (100g)", category: "Chocolates", unit: "packet", pricePerUnit: 150, quantityAvailable: 30, isDivisible: false },
//                 { name: "Hershey’s Kisses (100g)", category: "Chocolates", unit: "packet", pricePerUnit: 200, quantityAvailable: 20, isDivisible: false },
//             ],
//             // 🥦 Veggies & Fruits (20)
//             "Veggies and Fruits": [
//                 { name: "Potato", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 30, quantityAvailable: 500, isDivisible: true },
//                 { name: "Tomato", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 40, quantityAvailable: 400, isDivisible: true },
//                 { name: "Onion", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 50, quantityAvailable: 300, isDivisible: true },
//                 { name: "Carrot", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 60, quantityAvailable: 200, isDivisible: true },
//                 { name: "Cabbage", category: "Veggies & Fruits", unit: "piece", pricePerUnit: 30, quantityAvailable: 100, isDivisible: false },
//                 { name: "Cauliflower", category: "Veggies & Fruits", unit: "piece", pricePerUnit: 40, quantityAvailable: 90, isDivisible: false },
//                 { name: "Spinach (bunch)", category: "Veggies & Fruits", unit: "bunch", pricePerUnit: 20, quantityAvailable: 80, isDivisible: false },
//                 { name: "Apple", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 150, quantityAvailable: 100, isDivisible: true },
//                 { name: "Banana (dozen)", category: "Veggies & Fruits", unit: "dozen", pricePerUnit: 60, quantityAvailable: 60, isDivisible: false },
//                 { name: "Orange", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 120, quantityAvailable: 70, isDivisible: true },
//                 { name: "Grapes", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 90, quantityAvailable: 80, isDivisible: true },
//                 { name: "Mango", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 200, quantityAvailable: 50, isDivisible: true },
//                 { name: "Papaya", category: "Veggies & Fruits", unit: "piece", pricePerUnit: 80, quantityAvailable: 30, isDivisible: false },
//                 { name: "Watermelon", category: "Veggies & Fruits", unit: "piece", pricePerUnit: 100, quantityAvailable: 20, isDivisible: false },
//                 { name: "Pineapple", category: "Veggies & Fruits", unit: "piece", pricePerUnit: 90, quantityAvailable: 25, isDivisible: false },
//                 { name: "Strawberry (250g)", category: "Veggies & Fruits", unit: "gram", pricePerUnit: 150, quantityAvailable: 40, isDivisible: true },
//                 { name: "Blueberry (125g)", category: "Veggies & Fruits", unit: "gram", pricePerUnit: 200, quantityAvailable: 20, isDivisible: true },
//                 { name: "Pomegranate", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 180, quantityAvailable: 30, isDivisible: true },
//                 { name: "Guava", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 80, quantityAvailable: 40, isDivisible: true },
//                 { name: "Sweet Lime", category: "Veggies & Fruits", unit: "kg", pricePerUnit: 100, quantityAvailable: 50, isDivisible: true },
//             ],
//             // 🌾 Flours (20)
//             Flours: [
//                 { name: "Wheat Flour (1kg)", category: "Flours", unit: "kg", pricePerUnit: 40, quantityAvailable: 200, isDivisible: true },
//                 { name: "Rice Flour (1kg)", category: "Flours", unit: "kg", pricePerUnit: 50, quantityAvailable: 150, isDivisible: true },
//                 { name: "Maida (1kg)", category: "Flours", unit: "kg", pricePerUnit: 45, quantityAvailable: 180, isDivisible: true },
//                 { name: "Besan (1kg)", category: "Flours", unit: "kg", pricePerUnit: 60, quantityAvailable: 120, isDivisible: true },
//                 { name: "Ragi Flour (1kg)", category: "Flours", unit: "kg", pricePerUnit: 70, quantityAvailable: 100, isDivisible: true },
//                 { name: "Corn Flour (500g)", category: "Flours", unit: "gram", pricePerUnit: 40, quantityAvailable: 80, isDivisible: true },
//                 { name: "Multigrain Atta (1kg)", category: "Flours", unit: "kg", pricePerUnit: 80, quantityAvailable: 90, isDivisible: true },
//                 { name: "Soya Flour (500g)", category: "Flours", unit: "gram", pricePerUnit: 60, quantityAvailable: 70, isDivisible: true },
//                 { name: "Jowar Flour (1kg)", category: "Flours", unit: "kg", pricePerUnit: 65, quantityAvailable: 60, isDivisible: true },
//                 { name: "Bajra Flour (1kg)", category: "Flours", unit: "kg", pricePerUnit: 55, quantityAvailable: 50, isDivisible: true },
//                 { name: "Barley Flour (500g)", category: "Flours", unit: "gram", pricePerUnit: 70, quantityAvailable: 40, isDivisible: true },
//                 { name: "Whole Wheat Atta (5kg)", category: "Flours", unit: "kg", pricePerUnit: 200, quantityAvailable: 30, isDivisible: true },
//                 { name: "Idli Rava (1kg)", category: "Flours", unit: "kg", pricePerUnit: 60, quantityAvailable: 60, isDivisible: true },
//                 { name: "Sooji / Rava (1kg)", category: "Flours", unit: "kg", pricePerUnit: 50, quantityAvailable: 70, isDivisible: true },
//                 { name: "Atta with Multigrains (10kg)", category: "Flours", unit: "kg", pricePerUnit: 500, quantityAvailable: 20, isDivisible: true },
//                 { name: "Whole Grain Rye Flour (1kg)", category: "Flours", unit: "kg", pricePerUnit: 150, quantityAvailable: 20, isDivisible: true },
//                 { name: "Oats Flour (500g)", category: "Flours", unit: "gram", pricePerUnit: 80, quantityAvailable: 30, isDivisible: true },
//                 { name: "Almond Flour (500g)", category: "Flours", unit: "gram", pricePerUnit: 300, quantityAvailable: 15, isDivisible: true },
//                 { name: "Coconut Flour (500g)", category: "Flours", unit: "gram", pricePerUnit: 250, quantityAvailable: 10, isDivisible: true },
//                 { name: "Brown Rice Flour (1kg)", category: "Flours", unit: "kg", pricePerUnit: 120, quantityAvailable: 25, isDivisible: true }
//             ]
//         };
//         await Product.insertMany(products);
//         console.log("Products seeded successfully")
//         process.exit(1);
//     } catch (error) {
//         console.error("Error seeding products:", error);
//         process.exit(1);
//     }
// }
// seedProducts();

import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const categoriesData = [
  { name: "Dairy" },
  { name: "Biscuits" },
  { name: "Chocolates" },
  { name: "Veggies and Fruits" },
  { name: "Flours" },
];

// Example products per category
const sampleProducts = {
  Dairy: [
    { name: "Milk", unit: "litre", pricePerUnit: 50, isDivisible: true, image: "https://hamul.coop/wp-content/uploads/2020/09/kidmilk2.jpg" },
    { name: "Butter", unit: "kg", pricePerUnit: 400, isDivisible: true, image: "https://kitchenaid.co.nz/cdn/shop/articles/Blog_Images.png?v=1739938525" },
    { name: "Cheese", unit: "kg", pricePerUnit: 500, isDivisible: true, image: "https://viralkida.in/wp-content/uploads/2021/08/Cheese.jpg" },
    { name: "Curd", unit: "kg", pricePerUnit: 60, isDivisible: true, image: "https://tiimg.tistatic.com/fp/1/007/642/-pure-fresh-organic-quality-white-milk-curd-paneer-ghee-1-kg-821.jpg" },
    { name: "Paneer", unit: "kg", pricePerUnit: 350, isDivisible: true, image: "https://thumbs.dreamstime.com/b/chunks-paneer-cheese-photo-freshly-cut-cutting-board-knife-background-shallow-focus-across-middle-53688913.jpg" },
    { name: "Ghee", unit: "litre", pricePerUnit: 600, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTFlwTlhv8sx6zrDhPu9PyMQfzvvOtlhWRg&s" },
    { name: "Lassi", unit: "litre", pricePerUnit: 40, isDivisible: true, image: "https://www.spicypunch.com/wp-content/uploads/2019/06/lassi-recipe-1280x720.jpg" },
    { name: "Flavored Milk", unit: "litre", pricePerUnit: 70, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBXH5ROxrWd0e8LRRq1bnVazImNb8kxgIOxg&s" },
    { name: "Cream", unit: "kg", pricePerUnit: 450, isDivisible: true, image: "https://cdn.usdairy.com/optimize/getmedia/8c3008d8-329f-4a5b-a238-5cb398b16704/cream_intextimage.png?format=webp" },
    { name: "Khoa", unit: "kg", pricePerUnit: 300, isDivisible: true, image: "https://www.jiomart.com/images/product/original/491934776/amul-khoa-200-g-pouch-product-images-o491934776-p590364662-0-202203150544.jpg?im=Resize=(1000,1000)" },
    { name: "Buttermilk", unit: "litre", pricePerUnit: 30, isDivisible: true, image: "https://consumer-voice.org/wp-content/uploads/2023/04/Buttermilk-A-Refreshing-Summer-Drink.jpg" },
    { name: "Malted Milk Powder", unit: "kg", pricePerUnit: 250, isDivisible: false, image: "https://tiimg.tistatic.com/fp/1/007/476/hygienically-processed-pure-premium-quality-dried-malted-milk-powder-028.jpg" },
    { name: "Evaporated Milk", unit: "can", pricePerUnit: 80, isDivisible: false, image: "https://static.toiimg.com/photo/77684666.cms" },
    { name: "Condensed Milk", unit: "can", pricePerUnit: 120, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo-c7yMLF_wU4KTjidqrq6V-Y6ODA1_jHvyPfRj10csriNKjfI8emYoaWfhZCmxPucFTg&usqp=CAU" },
    { name: "Skimmed Milk", unit: "litre", pricePerUnit: 45, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXvkiPdS0y4X77GEOVKenp-TnyvsUZU56hjw&s" },
    { name: "Double Toned Milk", unit: "litre", pricePerUnit: 40, isDivisible: true, image: "https://5.imimg.com/data5/QM/RK/GLADMIN-10870697/sudha-smart-milk-double-toned-milk.png" },
    { name: "Whole Milk", unit: "litre", pricePerUnit: 55, isDivisible: true, image: "https://horizon.com/wp-content/uploads/horizon-organic-whole-milk-lockup-v3-.png" },
    { name: "Milk Powder", unit: "kg", pricePerUnit: 280, isDivisible: false, image: "https://www.marthastewart.com/thmb/_n6b8N7i1enxW0vwrtztm-2GOfs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-powdered-milk-getty-0823-d48aaff493c64523b78b8c521eee16ff.jpg" },
    { name: "Chocolate Milk", unit: "litre", pricePerUnit: 75, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQdmtEzps3zaE2-XZyaHUErWzfwOFyjQZRw&s" },
    { name: "Soy Milk", unit: "litre", pricePerUnit: 90, isDivisible: true, image: "https://www.kayawell.com/Data/UserContentImg/2018/5/87960995-8030-48bd-a77d-42958da68096.jpg" },
  ],
  Biscuits: [
    { name: "Parle-G", unit: "pack", pricePerUnit: 10, isDivisible: false, image: "https://m.media-amazon.com/images/I/71bufOt9zAL._UF894,1000_QL80_.jpg" },
    { name: "Marie Gold", unit: "pack", pricePerUnit: 25, isDivisible: false, image: "https://m.media-amazon.com/images/I/81Jrv8TkWxL.jpg" },
    { name: "Bourbon", unit: "pack", pricePerUnit: 30, isDivisible: false, image: "https://media.licdn.com/dms/image/v2/C4D12AQG-OA9xbI_iDA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1617862254490?e=2147483647&v=beta&t=ysGECB20Qk7izmcPTiEuBeNAc9HmKJ7_xGIMkyAe8_M" },
    { name: "Oreo", unit: "pack", pricePerUnit: 40, isDivisible: false, image: "https://img.thecdn.in/285347/1677672623033_SKU-0363_0.jpg?width=600&format=webp" },
    { name: "Good Day", unit: "pack", pricePerUnit: 35, isDivisible: false, image: "https://5.imimg.com/data5/SELLER/Default/2023/9/348288923/GY/ZF/SU/198576891/britannia-good-day-biscuit.png" },
    { name: "Hide & Seek Fab", unit: "pack", pricePerUnit: 30, isDivisible: false, image: "https://snackcandypop.com/cdn/shop/products/87331526_2685443388241513_462754456669257728_n.jpg?v=1636309722" },
    { name: "Jim Jam", unit: "pack", pricePerUnit: 30, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuk4DsEwGne_2OqpOz8FIJy9-ss-moX6V1fA&s" },
    { name: "Milk Bikis", unit: "pack", pricePerUnit: 20, isDivisible: false, image: "https://media.britannia.co.in/small_Milk_Bikis_Style_2b410c958c.png" },
    { name: "Krackjack", unit: "pack", pricePerUnit: 20, isDivisible: false, image: "https://eu.dookan.com/cdn/shop/files/ParleKrakjackBiscuits_60g_bundleof2x500px.png?v=1753787872" },
    { name: "50-50", unit: "pack", pricePerUnit: 20, isDivisible: false, image: "https://frugivore-bucket.s3.amazonaws.com/media/package/img_one/2020-01-09/50-50_Maska_Chaska_Salted__120GM.jpg" },
    { name: "Treat", unit: "pack", pricePerUnit: 35, isDivisible: false, image: "https://images-cdn.ubuy.co.in/65ad12d086f5794c3e0f58ba-britannia-treat-choco-sandwich-biscuits.jpg" },
    { name: "Little Hearts", unit: "pack", pricePerUnit: 25, isDivisible: false, image: "https://www.theprink.in/cdn/shop/files/1.png?v=1711786162" },
    { name: "Tiger Biscuits", unit: "pack", pricePerUnit: 15, isDivisible: false, image: "https://media.britannia.co.in/Tiger_Kreemz_Krunch_Choco_Chips_d317885019.jpg" },
    { name: "Monaco", unit: "pack", pricePerUnit: 20, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LBl8F0etf5rDTwn3ADC5BZ2OHb9_zKT9Iw&s" },
    { name: "Perk Wafer Biscuits", unit: "pack", pricePerUnit: 10, isDivisible: false, image: "https://rukminim2.flixcart.com/image/480/640/xif0q/chocolate/6/v/4/960-perk-plus-chocolate-coated-wafer-1-cadbury-original-imah6tcxenzhjzs4.jpeg?q=90" },
    { name: "KitKat Wafer", unit: "pack", pricePerUnit: 20, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHN9g7RxV0v2skLya31ECv3T0zLWVbFlxRHw&s" },
    { name: "Digestive Biscuits", unit: "pack", pricePerUnit: 50, isDivisible: false, image: "https://www.englishteastore.com/cdn/shop/files/lo9whromrlmqo7v0bdop.jpg?v=1741037291&width=1445" },
    { name: "Rusk", unit: "pack", pricePerUnit: 30, isDivisible: false, image: "https://www.tashasartisanfoods.com/blog/wp-content/uploads/2022/08/The-Easiest-Indian-Cake-Rusk-Eggless-FEATURE.jpg" },
    { name: "Milk Rusk", unit: "pack", pricePerUnit: 35, isDivisible: false, image: "https://images-cdn.ubuy.co.in/649d5a5a3bc5726bce5205d4-britannia-toastea-milk-rusk-19-75oz.jpg" },
    { name: "Multigrain Biscuits", unit: "pack", pricePerUnit: 60, isDivisible: false, image: "https://www.weleetfoods.com/cdn/shop/files/multigrain-cookie_bb32a291-cce9-40cb-af5d-9e515a83db8c.jpg?v=1709542215&width=480" },
  ],
  Chocolates: [
    { name: "Dairy Milk", unit: "bar", pricePerUnit: 40, isDivisible: false, image: "https://assets.winni.in/c_limit,dpr_1,fl_progressive,q_80,w_1000/81598_cadbury-dairy-milk-with-five-star.jpeg" },
    { name: "5 Star", unit: "bar", pricePerUnit: 20, isDivisible: false, image: "https://www.tangyshop.com/cdn/shop/files/cadbury-5-star-chocolate-india-tangy-shop-tangy-shop-620235.png?v=1719271847" },
    { name: "Perk", unit: "bar", pricePerUnit: 10, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzvqB24L6cbcl1P_gEDvQysdjzxzyj---3BQ&s" },
    { name: "KitKat", unit: "bar", pricePerUnit: 20, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAqfpyga99oRPYYxAWP_XXqPlSIRbziwL4-Q&s" },
    { name: "Munch", unit: "bar", pricePerUnit: 10, isDivisible: false, image: "https://www.tangyshop.com/cdn/shop/files/munch-chocolate-classic-tangyshop-tangy-shop-710306.jpg?v=1719271974&width=416" },
    { name: "Temptations", unit: "bar", pricePerUnit: 100, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqHo4n8tRDz86qtNKbMUBiFhmt6c0EuxcCQ&s" },
    { name: "Bournville", unit: "bar", pricePerUnit: 120, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrql7qKBBvs0ey6G_oyedCr4QpV_OwvKqHwQ&s" },
    { name: "Toblerone", unit: "bar", pricePerUnit: 200, isDivisible: false, image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Toblerone_3362.jpg" },
    { name: "Ferrero Rocher", unit: "box", pricePerUnit: 400, isDivisible: false, image: "https://www.hotbreads.co.in/cdn/shop/products/ferrero-rocher-chocolate-cake_1200x1200.jpg?v=1643397214" },
    { name: "Amul Dark Chocolate", unit: "bar", pricePerUnit: 80, isDivisible: false, image: "https://cdn.grofers.com/da/cms-assets/cms/product/bdb85bf0-1c46-42a3-90b4-e93216298636.jpg" },
    { name: "Snickers", unit: "bar", pricePerUnit: 50, isDivisible: false, image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product_videos_thumbnails/3459d9ef-99bc-4c0d-84df-b9ac37c97f1b.jpg" },
    { name: "Mars", unit: "bar", pricePerUnit: 60, isDivisible: false, image: "https://aafiadryfruits.in/storage/2024/07/76_Mars.jpg" },
    { name: "Milky Bar", unit: "bar", pricePerUnit: 25, isDivisible: false, image: "https://indiashopping.io/cdn/shop/files/milky-bar-choo-classic-pack-of-3.png?v=1752490438" },
    { name: "Chocopie", unit: "pack", pricePerUnit: 100, isDivisible: false, image: "https://www.tangyshop.com/cdn/shop/files/lotte-choco-pie-28g-pack-imported-from-india-tangy-shop-tangy-shop-194498.png?v=1721178195" },
    { name: "Galaxy", unit: "bar", pricePerUnit: 90, isDivisible: false, image: "https://c.files.bbci.co.uk/1616B/production/_131257409_4d3e7ae5-d024-46bd-8eb7-f3138786082d.jpg" },
    { name: "Lindt", unit: "bar", pricePerUnit: 250, isDivisible: false, image: "https://cdn.igp.com/f_auto,q_auto,t_pnopt19prodlp/products/p-lindt-gourmet-chocolate-box-205012-m.jpg" },
    { name: "Hershey’s", unit: "bar", pricePerUnit: 200, isDivisible: false, image: "https://www.thoughtco.com/thmb/mFWK6HRnkqhEZ__q8uot-QeizMg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Hershey-56b007823df78cf772cb32d0.jpg" },
    { name: "Melody", unit: "pack", pricePerUnit: 10, isDivisible: false, image: "https://m.media-amazon.com/images/I/61S6e7sbjDL.jpg" },
    { name: "Éclairs", unit: "pack", pricePerUnit: 10, isDivisible: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6zQkMcT9svppzQVzZLJkK131o2VoTvH7vw&s" },
    { name: "Kisses", unit: "pack", pricePerUnit: 150, isDivisible: false, image: "https://rukminim2.flixcart.com/image/480/640/xif0q/chocolate/1/0/f/216-4-kisses-milk-chocolate-2-hershey-s-original-imagy2qprem2rz2b.jpeg?q=90" },
  ],
  "Veggies and Fruits": [
    { name: "Tomato", unit: "kg", pricePerUnit: 30, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJKRPXQYgZjJmuQTgXVQNLoZRxRWe7aW09wg&s" },
    { name: "Onion", unit: "kg", pricePerUnit: 40, isDivisible: true, image: "https://plantix.net/en/library/assets/custom/crop-images/onion.jpeg" },
    { name: "Potato", unit: "kg", pricePerUnit: 35, isDivisible: true, image: "https://www.simplotfoods.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2FRKiZ605RAV8kjDQnxFCWP%2Fb03b8729817c90b29b88d536bfd37ac5%2F9-Unusual-Uses-For-Potatoes.jpg%3Ffm%3Dwebp&w=1920&q=75" },
    { name: "Carrot", unit: "kg", pricePerUnit: 50, isDivisible: true, image: "https://www.trustbasket.com/cdn/shop/articles/Carrot.jpg?v=1688378789" },
    { name: "Cabbage", unit: "kg", pricePerUnit: 30, isDivisible: true, image: "https://www.orgpick.com/cdn/shop/products/Organic_Cabbage_Green.jpg?v=1544634755" },
    { name: "Cauliflower", unit: "kg", pricePerUnit: 40, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfE9Co-fyaLr9OTvmJR8Nr3HHw6Nmil5NJew&s" },
    { name: "Spinach", unit: "bunch", pricePerUnit: 20, isDivisible: false, image: "https://www.trustbasket.com/cdn/shop/articles/Spinach.webp?v=1686909241" },
    { name: "Banana", unit: "dozen", pricePerUnit: 60, isDivisible: false, image: "https://www.jiomart.com/images/product/original/590000617/banana-yellaki-1-kg-product-images-o590000617-p590000617-0-202409171906.jpg?im=Resize=(420,420)" },
    { name: "Apple", unit: "kg", pricePerUnit: 120, isDivisible: true, image: "https://images.everydayhealth.com/images/diet-nutrition/apples-101-about-1440x810.jpg?w=508" },
    { name: "Mango", unit: "kg", pricePerUnit: 150, isDivisible: true, image: "https://draxe.com/wp-content/uploads/2019/04/DrAxeMangoNutritionThumbnail.jpg" },
    { name: "Orange", unit: "kg", pricePerUnit: 100, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0DfcjTXAP16kRt40c0upB7I_0gQmkM7ME2g&s" },
    { name: "Grapes", unit: "kg", pricePerUnit: 80, isDivisible: true, image: "https://www.foodrepublic.com/img/gallery/15-types-of-grapes-to-know-eat-and-drink/thomcord-1743188190.jpg" },
    { name: "Pineapple", unit: "piece", pricePerUnit: 50, isDivisible: false, image: "https://cdn.qvm.com.au/wp-content/uploads/2020/10/Pineapple-Acid-Free-1.jpg" },
    { name: "Papaya", unit: "piece", pricePerUnit: 40, isDivisible: false, image: "https://www.dreamfoodscaribe.com/wp-content/uploads/2024/07/papaya-fruit.webp" },
    { name: "Watermelon", unit: "piece", pricePerUnit: 70, isDivisible: false, image: "https://centershealthcare.com/wp-content/uploads/2022/04/Watermelon.webp" },
    { name: "Cucumber", unit: "kg", pricePerUnit: 25, isDivisible: true, image: "https://www.greendna.in/cdn/shop/products/cucumber_1_700x.jpg?v=1594219681" },
    { name: "Ladyfinger", unit: "kg", pricePerUnit: 40, isDivisible: true, image: "https://www.reset.in/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F101044%2F1731482586-ladyfinger-bhindi.jpg&w=1200&q=75" },
    { name: "Beans", unit: "kg", pricePerUnit: 60, isDivisible: true, image: "https://vgrgardens.com/wp-content/uploads/2024/11/Bush-Beans-%E0%AE%AA%E0%AF%80%E0%AE%A9%E0%AF%8D%E0%AE%B8%E0%AF%8D.jpg" },
    { name: "Guava", unit: "kg", pricePerUnit: 70, isDivisible: true, image: "https://www.health.com/thmb/XlWTD8TZF5574DVtMEfD-XSj5Lg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guava-15d1050d22034909bfca038ef1f8aaa2.jpg" },
    { name: "Pomegranate", unit: "kg", pricePerUnit: 150, isDivisible: true, image: "https://agribegri.com/productimage/8d9000c65a836f2036f8ea5227b3e5fd-06-12-19-10-01-41.webp" },
  ],
  Flours: [
    { name: "Wheat Flour", unit: "kg", pricePerUnit: 40, isDivisible: true, image: "https://chakkiwalle.com/cdn/shop/files/istockphoto-172876049-612x612_4f7de454-e936-4d89-ac59-672602e1efa4.jpg?v=1711962097&width=1445" },
    { name: "Rice Flour", unit: "kg", pricePerUnit: 50, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5E2yOWnewat4wQb8tUac7HxdPv2ba18kwsQ&s" },
    { name: "Maida", unit: "kg", pricePerUnit: 35, isDivisible: true, image: "https://static.toiimg.com/photo/102473580.cms" },
    { name: "Besan", unit: "kg", pricePerUnit: 60, isDivisible: true, image: "https://organicshandy.com/wp-content/uploads/2018/10/Besan-Flour.jpg" },
    { name: "Ragi Flour", unit: "kg", pricePerUnit: 80, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTzi9TKZZ4sOTv6LAGdwF19bbVWFBJWLhAvA&s" },
    { name: "Corn Flour", unit: "kg", pricePerUnit: 70, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXwYo3ByVuXZpIx6Ei7R5E21d-E9rc9ZRSu9_PuQomBXoNHS5DxOA3dtvJE4qpV8Myic0&usqp=CAU" },
    { name: "Sooji", unit: "kg", pricePerUnit: 50, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO18zklrM_bmeYy5eT-GHJ1zH5c39V1qisEw&s" },
    { name: "Barley Flour", unit: "kg", pricePerUnit: 90, isDivisible: true, image: "https://www.greendna.in/cdn/shop/products/barleyflour_542x.jpg?v=1660203901" },
    { name: "Oats Flour", unit: "kg", pricePerUnit: 120, isDivisible: true, image: "https://static.toiimg.com/thumb/msid-104684213,width-1070,height-580,imgsize-1604457,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" },
    { name: "Buckwheat Flour", unit: "kg", pricePerUnit: 150, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNHXeYd5WpcOlhZTcTyNwFbDtyczdiJMurGw&s" },
    { name: "Multigrain Flour", unit: "kg", pricePerUnit: 100, isDivisible: true, image: "https://sudhantira.com/cdn/shop/files/MultiGrainAtta.webp?v=1752227009&width=1445" },
    { name: "Jowar Flour", unit: "kg", pricePerUnit: 80, isDivisible: true, image: "https://m.media-amazon.com/images/I/81dG-jBNX0L._UF1000,1000_QL80_.jpg" },
    { name: "Bajra Flour", unit: "kg", pricePerUnit: 70, isDivisible: true, image: "https://5.imimg.com/data5/SELLER/Default/2024/7/434088186/KP/LV/DX/156531209/bajra-flour.jpg" },
    { name: "Amaranth Flour", unit: "kg", pricePerUnit: 140, isDivisible: true, image: "https://m.media-amazon.com/images/I/61UKuqyAD4L._UF1000,1000_QL80_.jpg" },
    { name: "Quinoa Flour", unit: "kg", pricePerUnit: 200, isDivisible: true, image: "https://www.greendna.in/cdn/shop/products/WhatsAppImage2022-12-16at5.57.15PM_612x.jpg?v=1671193666" },
    { name: "Almond Flour", unit: "kg", pricePerUnit: 600, isDivisible: true, image: "https://m.media-amazon.com/images/I/41aCEqlvL3L._UF1000,1000_QL80_.jpg" },
    { name: "Coconut Flour", unit: "kg", pricePerUnit: 400, isDivisible: true, image: "https://coconutseller.in/wp-content/uploads/2023/11/Coconut-Flour.jpg" },
    { name: "Soy Flour", unit: "kg", pricePerUnit: 100, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfTFLS85T14r9YjLGqVWPycaV3MxBzsvFZDg&s" },
    { name: "Teff Flour", unit: "kg", pricePerUnit: 250, isDivisible: true, image: "https://thecoconutmama.com/wp-content/uploads/2023/05/What-Is-Teff-Flour-jpg.webp" },
    { name: "Cassava Flour", unit: "kg", pricePerUnit: 180, isDivisible: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3szs4Xoa4zwIvo446ONSruZFUA08YPcycEA&s" },
  ],
};

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Clear old data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Insert categories
    const insertedCategories = await Category.insertMany(categoriesData);
    console.log("✅ Categories inserted");

    // Create a lookup map for category IDs
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Insert products
    let products = [];
    for (let categoryName in sampleProducts) {
      const categoryId = categoryMap[categoryName];
      const categoryProducts = sampleProducts[categoryName].map((prod) => ({
        ...prod,
        category: categoryId,
        quantityAvailable: 100, // default
      }));
      products = [...products, ...categoryProducts];
    }

    await Product.insertMany(products);
    console.log("Products inserted successfully");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.disconnect();
  }
};

seedDB();
