import { Router } from 'express';

import { requireCsrf } from '../../middleware/csrf.middleware.js';
import userController from './user.controller.js';

const router = Router();
router.get('/', userController.showSignup);
router.post('/', requireCsrf, userController.register);

export default router;
