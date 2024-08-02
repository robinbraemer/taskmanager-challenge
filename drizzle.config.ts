import { defineConfig } from 'drizzle-kit';
import env from "./src/lib/env";

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
