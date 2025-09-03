import express from 'express';
import * as userRoutes from '@controllers/userController';

const router = express.Router();
router.post('/', userRoutes.createUserHandler);
router.get('/', userRoutes.getAllUsersHandler);

export default router;
