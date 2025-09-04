import express from 'express';
import * as educationController from '@controllers/educationController';


const router = express.Router();

router.post('/',educationController.createEducationHandler);
router.get('/:id', educationController.getEducationByIdHandler);
router.get('/', educationController.getEducationsByUserIdHandler);



export default router;
