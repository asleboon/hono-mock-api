import { z } from "@hono/zod-openapi";

export type AppError =
    | { type: "FETCH_ERROR"; error: Error }
    | { type: "PARSE_ERROR"; error: z.ZodError };
