import mongoose from "mongoose";

export const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI as string)

    console.log(`MongoDB connected`.green.bold)
}
