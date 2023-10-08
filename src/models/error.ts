import { z } from "@hono/zod-openapi";

export type AppError =
    | { type: "ERROR"; error: Error }
    | { type: "FETCH_ERROR"; error: Error }
    | { type: "PARSE_ERROR"; error: z.ZodError };
