import express from 'express';

import pool from '@/config/db';
import { errorHandler } from '@/middleware/error.middleware';
import filepipeRouter from '@/modules/filepipe/filepipe.routes';
import homeRouter from '@/modules/home/home.routes';
import userRouter from '@/modules/users/user.routes';

// Application composition and configuration.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Preserve the exact public URL paths of the original application.
app.use('/user', userRouter);
app.use('/filepipe', filepipeRouter);
app.use('/', homeRouter);

// Express error handlers must be registered after the routes.
app.use(errorHandler);

// Keep app.ts as the executable entry point: package.json remains unchanged.
const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? '127.0.0.1';

const server = app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

// Close the HTTP listener and PostgreSQL pool during a graceful shutdown.
function shutdown() {
    server.close(() => {
        void pool.end().then(() => process.exit(0)).catch((error: unknown) => {
            console.error('Database shutdown failed:', error);
            process.exit(1);
        });
    });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export { app };
export default app;
