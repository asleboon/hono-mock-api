import { createRoute, z } from "@hono/zod-openapi";
import { WeatherNowResponseSchema, WeatherNowQuerySchema } from "../models/met";
import { WeatherHistoricQuerySchema } from "../models/frost";
import { commonErrorResponses } from "./common";

// Define Open API routes
export const getWeatherNowRoute = createRoute({
    method: "get",
    path: "/now",
    request: {
        query: WeatherNowQuerySchema
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: WeatherNowResponseSchema
                }
            },
            description: "Ok"
        },
        ...commonErrorResponses
    }
});

// Define Open API routes
export const getTest = createRoute({
    method: "get",
    path: "/test",
    request: {
        query: WeatherNowQuerySchema
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: WeatherNowResponseSchema
                }
            },
            description: "Ok"
        },
        ...commonErrorResponses
    }
});

export const getWeatherHistoricRoute = createRoute({
    method: "get",
    path: "/historic",
    request: {
        query: WeatherHistoricQuerySchema
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.array(
                        z.object({
                            from: z
                                .string()
                                .datetime()
                                .openapi({ example: "2023-01-01T00:00:00Z" }),
                            value: z.number()
                        })
                    )
                }
            },
            description: "Ok"
        },
        ...commonErrorResponses
    }
});
