import mongoose from "mongoose";

const SectorSchema = new mongoose.Schema({
    sectorName: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

const Sector = mongoose.model("Sector", SectorSchema);

export default Sector;