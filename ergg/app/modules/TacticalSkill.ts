import mongoose from "mongoose";
import { models } from "mongoose";
import { Schema } from "mongoose";

const tsSchema = new Schema({
    lastGameNum: {
        required: true,
        type: Number,
    },
    data: {
        required: true,
        type: Object,
    }
});

const TacticalSkill = models?.tacticalskills ||  mongoose.model('tacticalskills', tsSchema);

export default TacticalSkill;