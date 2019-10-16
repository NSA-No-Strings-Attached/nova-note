import express from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';
import jsonwebtoken from 'jsonwebtoken';

const userRouter = express.Router();

/**
 * Adds a new User
 */
userRouter.post('/register', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    const newUser = new User({
        name: name,
        email: email,
        password: password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    try {
        let savedUser = await newUser.save();
        res.status(200).send({
            message: `User added successfully`,
            user: savedUser
        });
    } catch (err) {
        res.status(500).send({
            message: `User registration failed`,
            err: err.message()
        });
    }
});

/**
 * Login user
 */
userRouter.post('/login', async (req, res) => {
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    const user = await User.findOne({ email: userEmail });

    // If the user doesn't exist for the given email
    if (!user) {
        res.status(400).send(`Email is not registered`);
    }

    let validPassword = await bcrypt.compare(userPassword, user.password);
    if (!validPassword) {
        res.status(400).send(`Invalid Email or Password`);
    }

    // Creating JWT token
    let authToken = jsonwebtoken.sign({ _id: user._id }, process.env.JWT_SECRET_TOKEN);
    res.status(200).header('auth-token', authToken).send(authToken);
});

/**
 * Shows the Information of Current User
 */
userRouter.get('/me', async (req, res) => {
    let userId = req.body.userId;
    const user = await User.findById(userId);
    res.status(200).send(user);
});

export default userRouter;



