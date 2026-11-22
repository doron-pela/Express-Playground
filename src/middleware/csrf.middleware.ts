import { randomBytes, timingSafeEqual } from 'node:crypto';
import type { Request, RequestHandler } from 'express';

// A browser sends the session cookie automatically. This token proves that
// the state-changing form came from a page served by our application.
export function getCsrfToken(req: Request): string {
    if (!req.session.csrfToken) {
        req.session.csrfToken = randomBytes(32).toString('hex');
    }
    return req.session.csrfToken;
}

export const requireCsrf: RequestHandler = (req, res, next) => {
    const body = req.body as { _csrf?: unknown } | undefined;
    const token = typeof body?._csrf === 'string'
        ? body._csrf
        : req.get('x-csrf-token');
    const expected = req.session.csrfToken;

    if (typeof token !== 'string' || typeof expected !== 'string') {
        res.status(403).json({ error: 'Invalid CSRF token' });
        return;
    }

    const actualBytes = Buffer.from(token, 'utf8');
    const expectedBytes = Buffer.from(expected, 'utf8');

    if (
        actualBytes.length !== expectedBytes.length ||
        !timingSafeEqual(actualBytes, expectedBytes)
    ) {
        res.status(403).json({ error: 'Invalid CSRF token' });
        return;
    }

    next();
};
