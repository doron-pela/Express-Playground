import bcrypt from 'bcryptjs';

import userRepository from './user.repository.js';

function isUniqueViolation(error: unknown): boolean {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
    );
}

async function register(username: string, password: string) {
    // bcrypt has a 72-BYTE input limit, not a 72-character limit.
    if (Buffer.byteLength(password, 'utf8') > 72) {
        return { ok: false, reason: 'PASSWORD_TOO_LONG' } as const;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        const user = await userRepository.insertUsername(username, passwordHash);
        return { ok: true, user } as const;
    } catch (error) {
        // The UNIQUE constraint, not a separate SELECT, guarantees uniqueness.
        if (isUniqueViolation(error)) {
            return { ok: false, reason: 'USERNAME_TAKEN' } as const;
        }
        throw error;
    }
}

export default { register };
