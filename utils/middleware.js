import { verifyToken } from "./tokenUtil.js";
import { AdminModel } from "../models/admins.models.js";
import { StudentModel } from "../models/student.models.js";
import { TeacherModel } from "../models/teacher.models.js";
import ApiResponse from "./ApiResponse.js";



export const studentMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        const decoded = verifyToken(token);
        const student = await StudentModel.findOne({ _id: decoded.id, token: token });
        if (!student) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        // check expiration
        if (student.tokenExpiry < Date.now()) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        req.student = student;
        next();
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};


export const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        const decoded = verifyToken(token);
        const admin = await AdminModel.findOne({ _id: decoded.id, token: token });
        // check expiration
        if (admin.tokenExpiry < Date.now()) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        if (!admin) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong: ' + error));
    }
}

export const teacherMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        const decoded = verifyToken(token);
        const teacher = await TeacherModel.findOne({ _id: decoded.id, token: token });
        // check expiration
        if (teacher.tokenExpiry < Date.now()) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        if (!teacher) {
            return res.status(401).json(ApiResponse.errorResponse('Authorization denied'));
        }
        req.teacher = teacher;
        next();
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
}