import mongoose from "mongoose";
import { models } from "mongoose";
import { Schema } from "mongoose";

const gameSchema = new Schema({
    lastGameNum: {
        required: true,
        type: Number,
    },
    date: {
        required: true,
        type: String,
    },
    data: {
        required: true,
        type: Object,
    }
});

const Game = models?.game ||  mongoose.model('game', gameSchema);

export default Game;