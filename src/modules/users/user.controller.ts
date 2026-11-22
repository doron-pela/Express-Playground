import type { Request, Response } from 'express';

import { getCsrfToken } from '../../middleware/csrf.middleware.js';
import userService from './user.service.js';
import { registerUserSchema } from './user.schema.js';
import { signupPage } from './user.view.js';

function showSignup(req: Request, res: Response): void {
    res.type('html').send(signupPage(getCsrfToken(req)));
}

async function register(req: Request, res: Response): Promise<void> {
    const parsed = registerUserSchema.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ error: 'Invalid username or password' });
        return;
    }

    const { username, password } = parsed.data;
    const result = await userService.register(username, password);

    if (!result.ok) {
        if (result.reason === 'USERNAME_TAKEN') {
            res.status(409).json({ error: 'Username already exists' });
        } else {
            res.status(400).json({ error: 'Password must be at most 72 UTF-8 bytes' });
        }
        return;
    }

    // Preserve the original successful HTML response and redirect.
    // Registration does not automatically log the user in.
    res.type('html').send(`
        <h1>POST request received</h1>
        <p>Redirecting you to the home page shortly...</p>
        <script>
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        </script>
    `);
}

export default { showSignup, register };
