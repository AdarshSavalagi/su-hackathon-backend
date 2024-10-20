import { compare, hashPassword } from "../utils/passwordUtil.js";
import ApiResponse from "../utils/ApiResponse.js";
import { StudentModel } from "../models/student.models.js";
import { generateToken } from "../utils/tokenUtil.js";

export const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await StudentModel.findOne({ email: email });
        if (!student) {
            return res.status(404).json(ApiResponse.errorResponse('Student not found'));
        }
        const isMatch = await compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json(ApiResponse.errorResponse('Invalid credentials'));
        }
        const token = generateToken({ id: student._id, email: student.email, role: 'student' });
        student.token = token;
        student.tokenExpiry = new Date(Date.now() + 3600000);

        await student.save();
        res.status(200).json(ApiResponse.successResponse({ token }));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};

export const addStudent = async (req, res) => {
    try {
        const { username, password, department } = req.body;
        // check if student already exists
        const studentExists = await StudentModel.findOne({ username: username });
        if (studentExists) {
            return res.status(400).json(ApiResponse.errorResponse('Student already exists'));
        }
        const hashedPassword = await hashPassword(password);
        const student = await StudentModel.create({ username: username, password: hashedPassword, department: department });
        student.save();
        res.status(201).json(ApiResponse.successResponse(student));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};

export const getStudents = async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.status(200).json(ApiResponse.successResponse(students));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const student = await StudentModel.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json(ApiResponse.errorResponse('Student not found'));
        }
        res.status(200).json(ApiResponse.successResponse(student));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};