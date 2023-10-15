import { z } from "zod";

const schema = z.object({
    // API_URL: z.string().url(),
    MET_CLIENT_ID: z.string(),
    MET_CLIENT_SECRET: z.string()
    // PORT: z.string().transform(Number),
});

const parsed = schema.safeParse(Bun.env);

if (!parsed.success) {
    console.error(
        "❌ Invalid environment variables:",
        JSON.stringify(parsed.error.format(), null, 4)
    );
    process.exit(1);
}

export const appEnv = parsed.data;
