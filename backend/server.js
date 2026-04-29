import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRouter.js';


const app = express();
const port = process.env.PORT || 2000;



await connectDB()

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/uploads", express.static("uploads"));


app.get('/', (req, res) => {
    res.send('Hello, World!');
});


//routes

app.use('/api/user', userRouter)
app.use("/api/posts", postRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});