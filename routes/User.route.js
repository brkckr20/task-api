import express from "express";
import User from "../models/User.model.js";
import Sector from '../models/Sector.model.js'
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get("/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        res.send(user);
    } catch (error) {
        console.log(error);
    }
})


router.post("/", async (req, res) => {
    try {
        const { name, username, password, sector, agree } = req.body;
        const data = {
            name,
            username,
            password,
            sector: sector[sector.length - 1],
            agree
        }
        const user = await User.create(data);
        const token = jwt.sign({
            username: user.username,
        }, "QHA&u8ri!>A6bJRFz6P<)UZUX0k#1l")
        res.send({ status: 'ok', token: token, user });
    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.json({ status: "error", code: "user-not-found", message: "User not found" });
            return;
        }
        if (user && user.password !== password) {
            console.log("wrong password");
            res.json({ status: "error", message: "Invalid password" });
        }
        if (user && user.password === password) {
            const token = jwt.sign({
                username: user.username,
            }, "QHA&u8ri!>A6bJRFz6P<)UZUX0k#1l")
            const { sectorName } = await Sector.findById(user.sector)
            res.send({ status: 'ok', token: token, user: user.username, values: user, sectorName });
        }
    } catch (error) {
        console.log(error);
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, username, password, sector } = req.body;
    try {
        const user = await User.findById(id);
        user.name = name;
        user.username = username;
        user.password = password;
        user.sector = sector[sector.length - 1];
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);
    }
})


export { router };
