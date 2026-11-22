import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

import pool from './db.js';

// This is NOT your PostgreSQL password. Generate a separate random secret:
// node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
const secret = process.env.SESSION_SECRET;

if (!secret || secret.length < 32) {
    throw new Error('Set SESSION_SECRET (at least 32 characters) in .env.local');
}

const PgSessionStore = connectPgSimple(session);

export const sessionMiddleware = session({
    store: new PgSessionStore({
        pool, // Reuse your existing PostgreSQL connection pool.
        createTableIfMissing: true, // Creates the "session" table if needed.
    }),
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours.
    },
});
