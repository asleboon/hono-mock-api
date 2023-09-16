import { ParamSchema } from "../models/param";
import { UserSchema, UsersSchema } from "../models/user";
import { createRoute } from "@hono/zod-openapi";

// Define Open API routes
export const userRoute = createRoute({
  method: "get",
  path: "users/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve user by id",
    },
  },
});

export const usersRoute = createRoute({
  method: "get",
  path: "/users",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UsersSchema,
        },
      },
      description: "Retrieve users",
    },
  },
});
