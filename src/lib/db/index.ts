import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import {DATABASE_URL} from "$env/static/private";

export const connection = postgres(DATABASE_URL);

const db = drizzle(connection,{
    schema
});

export default db;

