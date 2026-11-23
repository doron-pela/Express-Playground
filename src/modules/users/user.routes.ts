import { Router } from 'express';

import userController from './user.controller';

const router = Router();
router.get('/', userController.showSignup);
router.post('/', userController.register);

export default router;
