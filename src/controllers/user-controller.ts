import { Context } from "hono";
import { endTime, startTime } from "hono/timing";
import { userService } from "../services";

const getUsers = async (c: Context) => {
  startTime(c, "users");
  const users = await userService.fetchUsers();
  endTime(c, "users");
  return c.jsonT(users);
};

const getUser = async (c: Context) => {
  startTime(c, "user");
  const id = c.req.param("id");
  const user = await userService.fetchUserById(id);
  endTime(c, "user");
  return c.jsonT(user);
};

const userController = { getUsers, getUser };

export default userController;
