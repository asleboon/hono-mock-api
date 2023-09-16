import { OpenAPIHono } from "@hono/zod-openapi";
import { timing } from "hono/timing";
import { logger } from "hono/logger";
import userController from "./controllers/user-controller";
import { FrontPage } from "./templates/index";
import { postRoute, postsRoute, userRoute, usersRoute } from "./routes";
import postController from "./controllers/post-controller";

// Register app
const app = new OpenAPIHono();

// Define API
const apiV1 = new OpenAPIHono();

// Defined routes
//
// USERS
apiV1.openapi(usersRoute, (c) => userController.getUsers(c));
apiV1.openapi(userRoute, (c) => userController.getUser(c));

// POSTS
apiV1.openapi(postsRoute, (c) => postController.getPosts(c));
apiV1.openapi(postRoute, (c) => postController.getPost(c));

// ALBUMS
// apiV1.openapi(getUsersRoute, (c) => albumController.getAlbums(c));
// apiV1.openapi(getUserRoute, (c) => albumController.getAlbum(c));

// PHOTOs
// apiV1.openapi(userRoutes, (c) => photoController.getPhotos(c));
// apiV1.openapi(userRoutes, (c) => photoController.getPhoto(c));

// Define middleware
app.use("*", timing());
app.use("*", logger());

// TODO: cool front page htmx + jsx?
app.get("/", (c) => {
  return c.html(<FrontPage />);
});

// The OpenAPI documentation will be available at /doc
// Go to https://petstore.swagger.io or https://editor.swagger.io/
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Test API",
  },
});

// Attach API to app (Do this last)
app.route("/api/v1", apiV1);

export default {
  port: 8080,
  fetch: app.fetch,
};
