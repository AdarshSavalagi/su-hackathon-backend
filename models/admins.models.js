import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
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

export const AdminModel = mongoose.model('admin',adminSchema);

