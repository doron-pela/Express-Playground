import type { RequestHandler } from 'express';

// Attach this guard only to routes requiring a logged-in user.
export const requireAuth: RequestHandler = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }

    next();
};
