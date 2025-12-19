// import express from 'express';
// import bcrypt from "bcryptjs";
//
// const app = express()
//
// app.use(express.json());
//
// const users = []
//
// app.get('/users', (req, res) => {
//     res.json(users)
// })
//
// app.post('/users', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         const user = {name: req.body.name, password: hashedPassword}
//         users.push(user)
//         res.status(201).send()
//     } catch {
//         res.status(500).send()
//     }
// })
//
// app.post('/users/login', async (req, res) => {
//     const user = users.find(user => user.name === req.body.name)
//     if (user == null) {
//         return res.status(400).send('Cannot find user')
//     }
//     try {
//         if(await bcrypt.compare(req.body.password, user.password)) {
//             res.send("Success")
//         } else {
//             res.send("Not allowed u ninja")
//         }
//     } catch {
//         res.status(500).send()
//     }
// })
//
// app.listen(3000)

// TUTORIAL FOLLOWED:

// import express from 'express';
// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
// import connectDB from './config/db.js';
//
// const app = express();
// app.use(express.json());
// dotenv.config();
//
// connectDB();
//
// const posts = [
//     {username: 'Kyle', title: 'Kyles Post'},
//     {username: 'Beth', title: 'Beths Post'},
// ]
//
// // app.get('/posts', authenticateToken, (req, res) => {
// //     res.json(posts.filter(post => post.username === req.user.name));
// // })
//
// let refreshTokens = [];
//
// app.post('/token', (req, res) => {
//     const refreshToken = req.body.token
//     if (refreshToken == null) return  res.sendStatus(401);
//     if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//     jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         const accessToken = generateAccessToken({name: user.name});
//         res.json({ accessToken: accessToken })
//     })
// })
//
// app.delete('/logout', (req, res) => {
//     refreshTokens = refreshTokens.filter(token => token!== req.body.token)
//     res.sendStatus(204);
// })
//
// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const user = { name: username };
//
//     const accessToken = generateAccessToken(user);
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
//     refreshTokens.push(refreshToken);
//     res.json({ accessToken: accessToken, refreshToken: refreshToken });
// })
//
// function generateAccessToken(user) {
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'});
// }
//
// // function authenticateToken(req, res, next) {
// //     const authHeader = req.headers['authorization'];
// //     const token = authHeader && authHeader.split(' ')[1]
// //     if (token == null) return res.sendStatus(401);
// //
// //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
// //         if (err) return res.sendStatus(403);
// //         req.user = user;
// //         next();
// //     })
// // }
//
// app.listen(3000);

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import setupRoutes from "./routes/setupRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);

app.get("/", (req, res) => {
    res.send("API running successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);