import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'
const app=express();
const port= process.env.PORT;
connectDb();
const allowedOrigins=['http://localhost:5173']
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));


//api endpoints
app.get("/health-check",(req,res)=>{
    res.send("healthy.........")
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port,()=>{
   console.log(`server started at ${port}`)
});