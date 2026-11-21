import type { ErrorRequestHandler } from 'express';

// Express 5 forwards rejected async route handlers here automatically.
export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
    if (res.headersSent) return next(error);

    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
};
