import mongoose from "mongoose";
import { models } from "mongoose";
import { Schema } from "mongoose";

const synergySchema = new Schema({
    lastGameNum: {
        required: true,
        type: Number,
    },
    versionMajor: {
        required: true,
        type: Number,
    },
    versionMinor: {
        required: true,
        type: Number,
    },
    data: {
        required: true,
        type: Object,
    }
});

const Synergy = models.synergys ||  mongoose.model('synergys', synergySchema);

export default Synergy;