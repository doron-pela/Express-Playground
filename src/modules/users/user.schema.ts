import { z } from 'zod';

// Runtime validation is necessary: TypeScript types do not validate HTTP input.
export const registerUserSchema = z.object({
    username: z.string().trim().min(1).max(255),
    password: z.string().min(1),
});
