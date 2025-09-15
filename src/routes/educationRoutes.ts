import express from 'express';
import { authenticateToken } from "../middleware/authMiddleware";
import * as educationController from '@controllers/educationController';



const router = express.Router();

router.post('/',authenticateToken, educationController.createEducationHandler);
router.get('/:id', authenticateToken, educationController.getEducationByIdHandler);
router.get('/', authenticateToken, educationController.getEducationsByUserIdHandler);



export default router;
