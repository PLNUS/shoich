import mongoose, { Schema, models } from "mongoose";

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

const Game = models.Game || mongoose.model('game', gameSchema);

export default Game;