import { generateToken } from "../utils/tokenUtil.js";
import { AdminModel } from "../models/admins.models.js";
import { hashPassword, compare  } from "../utils/passwordUtil.js";
import ApiResponse from "../utils/ApiResponse.js";

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.table({username, password});
        const admin = await AdminModel.findOne({ username: username });
        if (!admin) {
            return res.status(404).json(ApiResponse.errorResponse('Invalid credentials'));
        }   
        const isMatch = await compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json(ApiResponse.errorResponse('Invalid credentials'));
        }
        const token = generateToken({ id: admin._id , username: admin.username, role: 'admin' });
        admin.token = token;
        admin.tokenExpiry = new Date(Date.now() + 3600000);
        await admin.save();
        res.status(200).json(ApiResponse.successResponse({ token }));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};

export const addAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const admin = await AdminModel.create({ username: username, password: hashedPassword });
        admin.password = undefined;
        res.status(201).json(ApiResponse.successResponse(admin));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse(error.message));
    }
};



