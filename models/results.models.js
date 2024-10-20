import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    student: {
        type: String,
        required: true
    },
    test: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const ResultModel = mongoose.model('result', resultSchema);