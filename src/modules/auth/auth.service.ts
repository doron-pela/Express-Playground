import bcrypt from 'bcryptjs';

import userRepository from '../users/user.repository.js';

// Returns a public user on success, or null for invalid credentials.
async function verifyCredentials(username: string, password: string) {
    // Reject bcrypt inputs that would be silently truncated after 72 bytes.
    if (Buffer.byteLength(password, 'utf8') > 72) return null;

    const user = await userRepository.findByUsername(username);
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return { id: user.id, username: user.username };
}

export default { verifyCredentials };
