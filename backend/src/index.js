import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config({
    path: './.env'
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

import userRouter from './routes/user.routes.js';
app.use('/api/user', userRouter);


connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed");
})