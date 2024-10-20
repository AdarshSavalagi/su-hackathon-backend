import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    username: {
        type: String,required:true,
        unique:true
    },
    password: {
        type: String
    },
    name:{
        type:String
    },
    department:{
        type:String
    },
    token: {
        type: String
    },
    tokenExpiry: {
        type: Date
    }
}, {
    timestamps: true
});

export const StudentModel = mongoose.model('student',studentSchema);