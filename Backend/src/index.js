import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './db/index.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT;

dbConnection()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Listen to the port ${port}`);
    });    
})
.catch((err)=>{
    console.log('MongoDB connection failed', err);
})

