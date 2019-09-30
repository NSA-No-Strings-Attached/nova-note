const express = require('express');
const ratelimit = require('express-rate-limit');

const app = express();

const port = process.env.PORT || 5000;

// Rate limiting
const rateLimiter = ratelimit({
    max: 250,
    windowMs: 60 * 60 * 1000,   // 1 hour
    message: `Too many request from this IP. Please try again later`
});
app.use(rateLimiter);

// Starting server
const server = app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});