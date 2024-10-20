import mongoose from "mongoose";

const departmentSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    }
});

export const departmentModel = new mongoose.model('department',departmentSchema);


