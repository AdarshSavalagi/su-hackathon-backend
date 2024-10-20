import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    username: {
        type: String,required:true,
        unique:true
    },
    password: {
        type: String
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

export const TeacherModel = mongoose.model('teacher',teacherSchema);
