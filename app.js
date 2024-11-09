import express from 'express';
import authRouter from './routes/auth.route.js';
import connectDB from './db/index.js';

const app = express();  

app.use(express.json());

app.use('/api/auth', authRouter);

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
})