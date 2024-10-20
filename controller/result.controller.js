import { ResultModel } from '../models/results.models.js';

export const createResult = async (req, res) => {
    try {
        const result = await ResultModel.create(req.body);
        res.status(201).json(ApiResponse.successResponse(result));
    } catch (error) {
        res.status(500).json(ApiResponse.errorResponse(error.message));
    }
}

export const getResults = async (req, res) => {
    try {
        const results = await ResultModel.find();
        res.status(200).json(ApiResponse.successResponse(results));
    } catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

export const getResult = async (req, res) => {
    try {
        const result = await ResultModel.findById(req.params.id);
        res.status(200).json(ApiResponse.successResponse(result));
    } catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

export const getResultsByStudent = async (req, res) => {
    try {
        const results = await ResultModel.find({ student: req.params.student });
        res.status(200).json(ApiResponse.successResponse(results));
    }
    catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

export const getResultsByTest = async (req, res) => {
    try {
        const results = await ResultModel.find({ test: req.params.test });
        res.status(200).json(ApiResponse.successResponse(results));
    } catch (error) {
        res.status(404).json(ApiResponse.errorResponse(error.message));
    }
}

