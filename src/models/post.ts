import { z } from "@hono/zod-openapi";

export const PostSchema = z
  .object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
  })
  .openapi("Post");

export const PostsSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;
