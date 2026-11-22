import type { NextFunction, Request, Response } from 'express';

import { getCsrfToken } from '../../middleware/csrf.middleware.js';
import { loggedInPage, loginPage } from './auth.view.js';

function showLogin(req: Request, res: Response): void {
    const token = getCsrfToken(req);

    if (req.isAuthenticated()) {
        res.type('html').send(loggedInPage(token));
        return;
    }

    res.type('html').send(loginPage(token, req.query.error === '1'));
}

function me(req: Request, res: Response): void {
    // The route's requireAuth middleware guarantees req.user exists.
    res.json({ user: req.user });
}

function logout(req: Request, res: Response, next: NextFunction): void {
    // Passport 0.7 requires a callback when logging out.
    req.logout((error: unknown) => {
        if (error) {
            next(error);
            return;
        }

        // Also destroy any remaining server-side session state.
        req.session.destroy((sessionError: unknown) => {
            if (sessionError) {
                next(sessionError);
                return;
            }

            res.clearCookie('connect.sid', { path: '/' });
            res.redirect('/login');
        });
    });
}

export default { showLogin, me, logout };
