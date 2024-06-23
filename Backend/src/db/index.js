import mongoose from 'mongoose'


const dbConnection = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed', error);
    }
}

export default dbConnection;
