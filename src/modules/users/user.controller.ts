import type { Request, Response } from 'express';

import userService from './user.service.js';
import { registerUserSchema } from './user.schema.js';
import { signupPage } from './user.view.js';

// Express handlers send responses; their return values are not HTTP responses.
function showSignup(_req: Request, res: Response): void {
    res.type('html').send(signupPage);
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
        res.status(400).json({ error: `${result.reason}` });
        return;
    }

    // Preserve the original successful response and redirect behavior.
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
