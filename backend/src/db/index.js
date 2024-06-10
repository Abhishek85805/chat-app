import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error while connecting to database: ", error);
    }
}

export default connectDB;