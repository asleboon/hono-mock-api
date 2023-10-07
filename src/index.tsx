import { OpenAPIHono } from "@hono/zod-openapi";
import { timing } from "hono/timing";
import { logger } from "hono/logger";
import { FrontPage } from "./templates/index";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { weatherController } from "./controllers/weather";
import { WeatherPage } from "./templates/weather";
import { serveStatic } from "hono/bun";
import { R, pipe } from "@mobily/ts-belt";
import { SwaggerUI } from "./templates/swagger";
import { locationService, weatherService } from "./services";
import { cacheMiddleware } from "./middleware";
import { getTest } from "./routes";

// Register app
export const app = new OpenAPIHono();

// TODO: cool front page htmx + jsx?
// TODO: Implement fallback
// app.get("/*", (c) => c.html(<Fallback />));

app.get("/", c => c.html(<FrontPage />));

app.get("/weather", async c => {
    const locationResult = await locationService.getLocation("Langgata", "Sandnes");

    if (R.isError(locationResult)) {
        c.html(
            <html>
                <main>
                    <h1>Noe gikk galt</h1>
                </main>
            </html>
        );
    }

    const { lon, lat } = pipe(locationResult, R.getExn);
    const weatherResult = await weatherService.getWeatherNow(lon, lat);

    if (R.isError(weatherResult)) {
        return c.jsonT(weatherResult._0, 404);
    }

    const weatherNow = pipe(weatherResult, R.getExn);

    return c.html(<WeatherPage weather={weatherNow} />);
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
