import bcrypt from 'bcryptjs';

import userRepository from './user.repository.js';

async function register(username: string, password: string) {
    // bcrypt has a 72-BYTE input limit, not a 72-character limit.
    if (Buffer.byteLength(password, 'utf8') > 72) {
        return { ok: false, reason: 'PASSWORD_TOO_LONG' } as const;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await userRepository.insertUsername(username, passwordHash);
    return { ok: true, user } as const;
}

export default { register };
