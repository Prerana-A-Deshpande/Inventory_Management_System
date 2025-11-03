import mongoose from "mongoose"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if (conn && conn.connection) {
            console.log(`MongoDB connected: ${conn.connection.host}`);
         }
        //else {
        //     console.log("✅ Connected successfully");
        // }
    } catch (error) {
        console.error("Failed to connect ", error.message)
        process.exit(1);
    }
}
export default connectDB;