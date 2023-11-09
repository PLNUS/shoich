import mongoose from "mongoose";
import { models } from "mongoose";
import { Schema } from "mongoose";

const traitSchema = new Schema({
    lastGameNum: {
        required: true,
        type: Number,
    },
    data: {
        required: true,
        type: Object,
    }
});

const Trait = models?.traits ||  mongoose.model('traits', traitSchema);

export default Trait;