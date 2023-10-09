import mongoose from "mongoose";
import { models } from "mongoose";
import { Schema } from "mongoose";

const gameSchema = new Schema({
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

const Game = models?.game ||  mongoose.model('game', gameSchema);

export default Game;