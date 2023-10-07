import { OpenAPIHono } from "@hono/zod-openapi";
import { getWeatherHistoricRoute, getWeatherNowRoute } from "../routes";
import { weatherHandler } from "../handlers/weather";

export const weatherController = new OpenAPIHono();

// GET /weather/now
weatherController.openapi(getWeatherNowRoute, weatherHandler.getWeatherNow);

// GET /weather/historic
weatherController.openapi(
    getWeatherHistoricRoute,
    weatherHandler.getWeatherHistoric
);
