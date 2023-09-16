import { z } from "@hono/zod-openapi";

export const ParamSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "1-10",
  }),
});
