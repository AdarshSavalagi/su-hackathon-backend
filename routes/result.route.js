import { Router } from "express";
import { createResult, getResults,getResult, getResultsByStudent, getResultsByTest } from "../controller/result.controller.js";
import { studentMiddleware, teacherMiddleware } from "../utils/middleware.js";


const router = Router();

router.post('/',studentMiddleware, createResult);
router.get('/', teacherMiddleware,getResults);
router.get('/:id', teacherMiddleware,getResult);
router.get('/student/:student', studentMiddleware,getResultsByStudent);
router.get('/test/:test', teacherMiddleware,getResultsByTest);



export default router;