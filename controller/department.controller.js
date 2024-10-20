import {departmentModel} from '../models/department.models';
import ApiResponse from '../utils/ApiResponse';

export const addDepartment = async (req, res) => {
    try {
        const { department } = req.body;
        const departmentObj = await departmentModel.create({ department: department });
        departmentObj.save();
        res.status(201).json(ApiResponse.successResponse(departmentObj));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};

export const getDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.find();
        res.status(200).json(ApiResponse.successResponse(departments));
    }
    catch (error) {
        res.status(500).json(ApiResponse.errorResponse('Something went wrong'));
    }
};

    