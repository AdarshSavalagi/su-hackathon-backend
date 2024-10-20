import { Router } from "express";
import { studentLogin, addStudent,getStudents,deleteStudent } from '../controller/student.controller.js';
import { adminMiddleware } from '../utils/middleware.js';

const router = Router();

router.post('/login', studentLogin);
router.post('/add', adminMiddleware, addStudent);
router.get('/', getStudents);
router.delete('/:id', adminMiddleware, deleteStudent);       


export default router;