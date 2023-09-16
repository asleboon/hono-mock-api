import { pipe } from "@mobily/ts-belt";
import { fetchAsync } from "../http";
import { parseResponse } from "../utils/parse";
import { PostSchema, PostsSchema } from "../models/post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const fetchPosts = async () => {
  return await pipe(
    fetchAsync(`${BASE_URL}/posts`),
    parseResponse(PostsSchema),
  );
};

const fetchPostById = async (id: string) => {
  return await pipe(
    fetchAsync(`${BASE_URL}/posts/${id}`),
    parseResponse(PostSchema),
  );
};

export const postService = { fetchPosts, fetchPostById };
