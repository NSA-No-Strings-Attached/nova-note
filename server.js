import express from 'express';
import ratelimit from 'express-rate-limit';
import userRouter from './routes/userRoutes';

const app = express();

const port = process.env.PORT || 5000;

// app.use(express.json());

// Rate limiting
const rateLimiter = ratelimit({
    max: 250,
    windowMs: 60 * 60 * 1000,   // 1 hour
    message: `Too many request from this IP. Please try again later`
});
app.use(rateLimiter);

// User Routes
app.use('/api/user', userRouter);

// Starting server
const server = app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});