import { ParamSchema } from "../models/param";
import { PostSchema, PostsSchema } from "../models/post";
import { createRoute } from "@hono/zod-openapi";

// Define Open API routes
export const postRoute = createRoute({
  method: "get",
  path: "posts/{id}",
  request: {
    params: ParamSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostSchema,
        },
      },
      description: "Retrieve post by id",
    },
  },
});

export const postsRoute = createRoute({
  method: "get",
  path: "/posts",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostsSchema,
        },
      },
      description: "Retrieve posts",
    },
  },
});
