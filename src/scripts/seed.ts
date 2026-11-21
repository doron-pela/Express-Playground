import bcrypt from 'bcryptjs';
import { Client } from 'pg';

// Usage remains: node/tsx src/config/dbScript.ts <postgres-connection-url>
// This script is intentionally separate from the HTTP application.
export async function seed(connectionString: string) {
    const client = new Client({ connectionString });
    console.log('seeding...');
    await client.connect();

    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS usernames (
                id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                username VARCHAR(255),
                password VARCHAR(255)
            );
        `);

        // `as const` preserves each pair as a tuple, so both values are
        // strings even with noUncheckedIndexedAccess enabled.
        for (const [username, password] of [
            ['Bryan', 'password1'],
            ['Odin', 'password2'],
            ['Damon', 'password3'],
        ] as const) {
            const passwordHash = await bcrypt.hash(password, 12);
            await client.query(
                'INSERT INTO usernames (username, password) VALUES ($1, $2)',
                [username, passwordHash],
            );
        }
        console.log('done');
    } finally {
        await client.end();
    }
}
