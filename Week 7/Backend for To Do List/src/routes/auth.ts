import { Router } from 'express';
import { login, signup } from '../controller/auth';

import { validateReqBody } from '../middleware/validator';
import { loginSchema, signupSchema } from '../schema/auth';

const router = Router();

router.post('/signup', validateReqBody(signupSchema), signup);

router.post('/login', validateReqBody(loginSchema), login);

export default router;
