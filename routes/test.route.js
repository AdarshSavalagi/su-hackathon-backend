import { Router } from "express";
import { createTest, getTests, getTest, updateTest, deleteTest, getTestsByDepartment, getTestsByTeacher, getTestsByDepartmentAndTeacher  } from "../controller/test.controller.js";
import { teacherMiddleware } from "../utils/middleware.js";

const router = Router();

router.post('/', teacherMiddleware,createTest);
router.get('/', getTests);
router.get('/:id', getTest);
router.put('/:id', teacherMiddleware,updateTest);
router.delete('/:id', teacherMiddleware,deleteTest);
router.get('/department/:department', getTestsByDepartment);
router.get('/teacher/:teacher', getTestsByTeacher);
router.get('/department/:department/teacher/:teacher', getTestsByDepartmentAndTeacher);




export default router;