import mongoose, { Schema, models } from "mongoose";

const verSchema = new Schema({
    versionMajor: {
        required: true,
        type: Number,
    },
    versionMinor: {
        required: true,
        type: Number,
    }
});

const Version =  models?.versions || mongoose.model('versions', verSchema);

export default Version;