import { Router } from "express";

const router = Router();
import { addTeacher, loginTeacher, getTeacher, deleteTeacher } from '../controller/teacher.controller.js';
import { adminMiddleware } from "../utils/middleware.js";

router.get('/', adminMiddleware, getTeacher);
router.post('/add', adminMiddleware, addTeacher);
router.post('/login', loginTeacher);
router.delete('/:id', adminMiddleware, deleteTeacher);


export default router;