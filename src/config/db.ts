import mongoose from "mongoose";



export const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error("MONGO_URI no definida en .env");

        await mongoose.connect(uri);
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1);
    }
};