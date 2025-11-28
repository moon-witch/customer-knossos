import { Pool } from 'pg';
import { DB_URL } from '$env/static/private';

const pool = new Pool({
    connectionString: DB_URL
});

export const db = pool;
