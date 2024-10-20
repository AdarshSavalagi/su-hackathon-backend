import ApiResponse from "../utils/ApiResponse.js";
import {TestModel} from "../models/test.models.js";

export const createTest = async (req, res) => {
    try {
        const body = req.body;
        const test = new TestModel({
            teacher: req.teacher._id,
            title: 'This is title',
            questions: body,
            department: req.teacher.department
        });
        await test.save();
        res.status(201).json(ApiResponse.successResponse(test));
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(error.message));
    }
}

export const getTests = async (req, res) => {
    try {
        const tests = await TestModel.find();
        res.status(200).json(ApiResponse.successResponse(tests));
    } catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

export const getTest = async (req, res) => {
    try {
        const test = await TestModel.findById(req.params.id);
        res.status(200).json(ApiResponse.successResponse(test));
    } catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

export const updateTest = async (req, res) => {
    try {
        const test = await TestModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(ApiResponse.successResponse(test));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse(error.message));
    }
}

export const deleteTest = async (req, res) => {
    try {
        const model = await TestModel.findByIdAndDelete(req.params.id);
        res.status(200).json(ApiResponse.successResponse(model));
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(error.message));
    }
}

export const getTestsByDepartment = async (req, res) => {
    try {
        const tests = await TestModel.find({ department: req.params.department });
        res.status(200).json(ApiResponse.successResponse(tests));
    } catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

export const getTestsByTeacher = async (req, res) => {
    try {
        const tests = await TestModel.find({ teacher: req.params.teacher });
        res.status(200).json(ApiResponse.successResponse(tests));
    } catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

export const getTestsByDepartmentAndTeacher = async (req, res) => {
    try {
        const tests = await TestModel.find({ department: req.params.department, teacher: req.params.teacher });
        res.status(200).json(ApiResponse.successResponse(tests));
    } catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

