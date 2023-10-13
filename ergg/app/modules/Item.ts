import mongoose from "mongoose";
import { models } from "mongoose";
import { Schema } from "mongoose";

const itemSchema = new Schema({
    lastGameNum: {
        required: true,
        type: Number,
    },
    data: {
        required: true,
        type: Object,
    }
});

const Item = models?.items ||  mongoose.model('items', itemSchema);

export default Item;