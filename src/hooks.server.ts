import { type Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';


const client = postgres(process.env.DB_URL);
const db = drizzle(client, { logger: false });

export const handle: Handle = async ({ event, resolve }) => {
    // add the db to the context
    event.locals.db = db;

    return resolve(event);
};