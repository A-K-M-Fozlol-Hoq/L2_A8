import express from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
const router = express.Router();

router.get('/', auth(), ProfileController.getUserProfile);

export const profileRoutes = router;
