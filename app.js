import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
const app = express();
dotenv.config()
import { router as sectorRouter } from './routes/Sector.route.js'
import { router as userRoute } from './routes/User.route.js';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
    res.send("hello");
})

app.use("/api/sector", sectorRouter);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

app.listen(PORT, () => {
    mongoose.connect(MONGO_URL).then(() => console.log("MongoDB conntected successfully"))
})