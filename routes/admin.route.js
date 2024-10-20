import { Router } from "express";
import { addAdmin, loginController } from "../controller/admin.controller.js";

const router = Router();

router.post('/login', loginController);
router.post('/add', addAdmin);

export default router;