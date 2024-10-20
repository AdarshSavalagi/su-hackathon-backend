import mongoose from "mongoose";


const testSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    questions:{
        type: Array,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    teacher:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

export const TestModel = mongoose.model('test',testSchema);

