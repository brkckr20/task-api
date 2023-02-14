import express from "express";
import Sector from "../models/Sector.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const sector = await Sector.find();
        res.send(sector);
    } catch (error) {

    }
})

router.post("/", async (req, res) => {
    try {
        const sector = await Sector.create(req.body);
        sector.save();
        res.send(sector);
    } catch (error) {
        console.log(error);
    }
    console.log(req.body);
    res.send();
})

export { router };
