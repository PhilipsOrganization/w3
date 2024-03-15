import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });
if (process.env.DB_URL === undefined) {
    throw new Error("DB_URL not found on .env.local");
}

export default {
    schema: "./src/lib/db/schema.ts",
    out: "./migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DB_URL,
    },
    strict: true,
} satisfies Config;