import pool from '../../config/db.js';

export type PublicUser = { id: number; username: string };

async function getAllUsernames(): Promise<PublicUser[]> {
    const result = await pool.query<PublicUser>(
        'SELECT id, username FROM usernames ORDER BY id',
    );
    return result.rows;
}

async function insertUsername(
    username: string,
    passwordHash: string,
): Promise<PublicUser> {
    // Keep the original usernames table and password column unchanged.
    // The password column now contains a bcrypt hash, never a raw password.
    const { rows } = await pool.query<PublicUser>(
        `INSERT INTO usernames (username, password)
         VALUES ($1, $2)
         RETURNING id, username`,
        [username, passwordHash],
    );
    return rows[0]!;
}

export default { getAllUsernames, insertUsername };
