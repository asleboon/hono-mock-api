import { Context } from "hono";
import { endTime, startTime } from "hono/timing";
import { postService } from "../services";

const getPosts = async (c: Context) => {
  startTime(c, "posts");
  const posts = await postService.fetchPosts();
  endTime(c, "posts");
  return c.jsonT(posts);
};

const getPost = async (c: Context) => {
  startTime(c, "post");
  const id = c.req.param("id");
  const post = await postService.fetchPostById(id);
  endTime(c, "post");
  return c.jsonT(post);
};

const postsController = { getPosts, getPost };

export default postsController;
