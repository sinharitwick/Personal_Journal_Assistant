import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from '../models/User.mjs';
const router = Router();

router.post('/register', asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({message: 'Fill in all details!'});
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400).json({message: 'email already registered!'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.cookie("token", accessToken, { httpOnly: true });
        res.status(201).json({ user });
    } else {
        res.status(400).json({message: 'Unable to register user!'});
    }
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'Fill in all details!'});
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.cookie("token", accessToken, { httpOnly: true });
        res.status(200).json({message: 'successfully logged in'});
    } else {
        res.status(401).json({message: 'email or password is not valid!'});
    }
}));

router.get('/currentUser', asyncHandler(async (req, res) => {
    res.json(req.user);
}));

router.get('/logout', asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({message: 'logged out'});
}));

export default router;