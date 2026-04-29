import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 2000;


await connectDB()

const allowedOrigins = ['http://localhost:5174'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: allowedOrigins}));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});