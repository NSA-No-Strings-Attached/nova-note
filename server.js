var express = require('express');
var ratelimit = require('express-rate-limit');
var userRouter = require('./routes/userRoutes');
var noteRouter = require('./routes/noteRoutes');
var noteBookRouter = require('./routes/noteBookRoutes');
var mongoose = require('mongoose');
var config = require('config');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

// Rate limiting
const rateLimiter = ratelimit({
    max: 250,
    windowMs: 60 * 60 * 1000,   // 1 hour
    message: `Too many requests from this IP. Please try again later`
});
app.use(rateLimiter);

// MongoDB connect
let dbString = `mongodb+srv://${config.get('dbUserName')}:${config.get('dbPassword')}@nova-note-lvtcy.gcp.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(dbString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log(`Connected to MongoDB....`))
    .catch((err) => {
        console.log(`Couldn't connect to MongoDB(mLab).... Terminating the application.` + err);
        process.exit(1);
    });


// User Routes
app.use('/api/user', userRouter);

// Note Routes
app.use('/api/note', noteRouter);

// NoteBook Routes
app.use('/api/noteBook', noteBookRouter);

// Starting server
const server = app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

module.exports = server;