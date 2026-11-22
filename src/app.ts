import express from 'express';
import passport from 'passport';

import pool from './config/db.js';
import { sessionMiddleware } from './config/session.js';
import { errorHandler } from './middleware/error.middleware.js';
import { configurePassport } from './modules/auth/auth.passport.js';
import authRouter from './modules/auth/auth.routes.js';
import filepipeRouter from './modules/filepipe/filepipe.routes.js';
import homeRouter from './modules/home/home.routes.js';
import userRouter from './modules/users/user.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Order matters: session first, then Passport restores req.user.
configurePassport();
app.use(sessionMiddleware);
app.use(passport.session());

// Original routes are unchanged; auth adds /login, /logout, and /me.
app.use('/user', userRouter);
app.use('/filepipe', filepipeRouter);
app.use('/', authRouter);
app.use('/', homeRouter);

app.use(errorHandler);

// Keep app.ts as the entry point: package.json scripts still work.
const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? '127.0.0.1';

const server = app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

function shutdown() {
    server.close(() => {
        void pool.end().then(() => process.exit(0)).catch((error: unknown) => {
            console.error('Database shutdown failed:', error);
            process.exit(1);
        });
    });
}

process.on('SIGINT', shutdown); //Signal interrupt (Ctrl+C) by user
process.on('SIGTERM', shutdown); //Signal termination (graceful kill command) by system (docker or kubernetes)

export { app };
export default app;
