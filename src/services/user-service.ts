import { pipe } from "@mobily/ts-belt";
import { fetchAsync } from "../http";
import { UserSchema, UsersSchema } from "../models/user";
import { parseResponse } from "../utils/parse";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const fetchUsers = async () => {
  return await pipe(
    fetchAsync(`${BASE_URL}/users`),
    parseResponse(UsersSchema),
  );
};

const fetchUserById = async (id: string) => {
  return await pipe(
    fetchAsync(`${BASE_URL}/users/${id}`),
    parseResponse(UserSchema),
  );
};

export const userService = { fetchUsers, fetchUserById };
