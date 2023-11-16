import mongoose from "mongoose";
import { models } from "mongoose";
import { Schema } from "mongoose";

const premadeSchema = new Schema({
    lastGameNum: {
        required: true,
        type: Number,
    },
    data: {
        required: true,
        type: Object,
    }
});

const PremadeGame = models?.premadegames ||  mongoose.model('premadegames', premadeSchema);

export default PremadeGame;