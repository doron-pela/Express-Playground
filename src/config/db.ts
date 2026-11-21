import dotenv from 'dotenv';
import { Pool } from 'pg';

// Preserve the original .env.local for development and .env for production.
// Already-defined environment variables take precedence (dotenv's default).
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
});

// pg automatically reads PGHOST, PGUSER, PGDATABASE, PGPASSWORD, and PGPORT.
// Avoid explicitly passing potentially undefined options with strict TS settings.
// Reuse this one pool across the whole application.
const pool = new Pool();

export default pool;
