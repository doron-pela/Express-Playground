import { Router } from 'express';
import passport from 'passport';

import { requireAuth } from '../../middleware/auth.middleware.js';
import { requireCsrf } from '../../middleware/csrf.middleware.js';
import authController from './auth.controller.js';

const router = Router();

router.get('/login', authController.showLogin);
router.post('/login', requireCsrf, passport.authenticate('local', {
    successRedirect: '/login',
    failureRedirect: '/login?error=1',
}));
router.post('/logout', requireCsrf, authController.logout);
router.get('/me', requireAuth, authController.me);

export default router;
