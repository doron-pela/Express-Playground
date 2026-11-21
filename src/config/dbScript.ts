#!/usr/bin/env node

// Compatibility entry point: retain the location of your original seed script.
import { seed } from '../scripts/seed.js';

const connectionString = process.argv[2];
if (!connectionString) {
    console.error('Usage: tsx src/config/dbScript.ts <postgres-connection-url>');
    process.exitCode = 1;
} else {
    seed(connectionString).catch((error: unknown) => {
        console.error('Seeding failed:', error);
        process.exitCode = 1;
    });
}
