import { OpenAPIHono } from "@hono/zod-openapi";
import { timing } from "hono/timing";
import { logger } from "hono/logger";
import { FrontPage } from "./templates/index";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { weatherController } from "./controllers/weather";
import { WeatherErrorPage, WeatherPage } from "./templates/weather";
import { serveStatic } from "hono/bun";
import { pipe } from "fp-ts/function";
import { SwaggerUI } from "./templates/swagger";
import { cacheMiddleware } from "./middleware";
import * as TE from "fp-ts/TaskEither";
import { locationService, weatherService } from "./services";

// TODO: replace zod with typeBox?
//https://github.com/sinclairzx81/typebox#benchmark

// Register app
export const app = new OpenAPIHono();

app.get("/", c => c.html(<FrontPage />));

// @ts-ignore
app.get("/weather", (c: any) => {
    return pipe(
        locationService.getLocation("Langgata 97", "Sandnes"),
        TE.chain(({ lon, lat }) => weatherService.getWeatherNow(lon, lat)),
        TE.fold(
            error => () => c.html(<WeatherErrorPage error={error} />),
            value => () => c.html(<WeatherPage weather={value} />)
        )
    )();
});

app.use("/static/*", serveStatic({ root: "./" }));

// Swagger json or ui
app.get("/swagger-ui", c => c.html(<SwaggerUI />));
app.doc("/swagger", {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "Weather API"
    }
});

app.onError((err, c) => {
    return c.text(`Error: ${err.message}`, 500);
});

// Bult in diddleware
app.use("*", timing(), logger(), cors(), prettyJSON());

// custom cache middleware
app.use("/api/v1/weather/*", cacheMiddleware);

// Attach routes
app.route("/api/v1/weather", weatherController);

export default {
    port: 8080,
    fetch: app.fetch
};
