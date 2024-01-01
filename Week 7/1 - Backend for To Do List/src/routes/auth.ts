import { Router } from 'express';
import { login, signup, refreshToken } from '../controller/auth';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/refresh', refreshToken);

export default router;
