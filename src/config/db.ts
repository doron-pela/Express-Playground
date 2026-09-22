import { Pool } from 'pg';

//This pool should be a singleton: A one-time instance of an object
export default new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

// Althoug, the "pg" library automatically reads and passes PGHOST, PGUSER, PGDATABASE, PGPASSWORD, and PGPORT from environment variables.
// So the above property assignment is not necessary. Only this:
// export default new Pool();

//or a Connection URI, if its a hosted db service like AWS, Azure, GCP, MongoDB Atlas, Supabase, Neon, Aiven, etc:
//new Pool({
//   connectionString: "<ConnectionURI> or process.env.DATABASE_URI"
// });
