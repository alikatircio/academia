import express from 'express';
import * as userController from '@controllers/userController';

const router = express.Router();
router.post('/', userController.createUserHandler);
router.get('/', userController.getAllUsersHandler);
router.get('/:id', userController.getUserByIdHandler);


export default router;
