import pool from '../../config/db.js';

export type PublicUser = { id: number; username: string };
type UserWithPassword = PublicUser & { password: string };

async function getAllUsernames(): Promise<PublicUser[]> {
    const { rows } = await pool.query<PublicUser>(
        'SELECT id, username FROM usernames ORDER BY id',
    );
    return rows;
}

async function findByUsername(username: string): Promise<UserWithPassword | null> {
    const { rows } = await pool.query<UserWithPassword>(
        'SELECT id, username, password FROM usernames WHERE username = $1',
        [username],
    );
    return rows[0] ?? null;
}

async function findById(id: number): Promise<PublicUser | null> {
    const { rows } = await pool.query<PublicUser>(
        'SELECT id, username FROM usernames WHERE id = $1',
        [id],
    );
    return rows[0] ?? null;
}

async function insertUsername(
    username: string,
    passwordHash: string,
): Promise<PublicUser> {
    // The original column is still named "password", but stores a bcrypt hash.
    const { rows } = await pool.query<PublicUser>(
        `INSERT INTO usernames (username, password)
         VALUES ($1, $2)
         RETURNING id, username`,
        [username, passwordHash],
    );
    return rows[0]!;
}

export default { getAllUsernames, findByUsername, findById, insertUsername };
