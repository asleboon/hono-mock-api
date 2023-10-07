import { z } from "@hono/zod-openapi";

export const commonErrorResponses = {
    401: {
        content: {
            "application/json": {
                schema: z.string()
            }
        },
        description: "Unauthorized"
    },
    400: {
        content: {
            "application/json": {
                schema: z.string()
            }
        },
        description: "Bad request"
    },
    500: {
        content: {
            "application/json": {
                schema: z.string()
            }
        },
        description: "Server error"
    }
};
