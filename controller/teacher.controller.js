import { hashPassword } from "../utils/passwordUtil.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TeacherModel } from "../models/teacher.models.js";
import { compare } from "../utils/passwordUtil.js";
import { generateToken } from "../utils/tokenUtil.js";

export const addTeacher = async (req, res) => {
    try {
        const { username, password, department } = req.body;
        const teacherExists = await TeacherModel.findOne({ username: username });
        if (teacherExists) {
            return res.status(400).json(ApiResponse.errorResponse('Teacher already exists'));
        }
        const hashedPassword = await hashPassword(password);
        const teacher = await TeacherModel.create({ username: username, password: hashedPassword, department: department });
        teacher.save();
        res.status(201).json(ApiResponse.successResponse(teacher));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};

export const loginTeacher = async (req, res) => {
    try {
        const { username, password } = req.body;
        const teacher = await TeacherModel.findOne({ username: username });
        if (!teacher) {
            return res.status(404).json(ApiResponse.errorResponse('teacher not found'));
        }
        const isMatch = await compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json(ApiResponse.errorResponse('Invalid credentials'));
        }
        const token = generateToken({ id: teacher._id, username: teacher.username, role: 'teacher' });
        teacher.token = token;
        teacher.tokenExpiry = new Date(Date.now() + 3600000);
        await teacher.save();
        res.status(200).json(ApiResponse.successResponse({ token }));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong '+error));
    }
};

export const getTeacher = async (req, res) => {
    try {
        const teacher = await TeacherModel.find();
        res.status(200).json(ApiResponse.successResponse(teacher));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};

export const deleteTeacher = async (req, res) => {
    try {
        const teacher = await TeacherModel.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json(ApiResponse.errorResponse('teacher not found'));
        }
        res.status(200).json(ApiResponse.successResponse(teacher));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};