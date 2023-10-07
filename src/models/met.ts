import { z } from "@hono/zod-openapi";
import { propOr } from "rambda";
import { weatherIconMapping } from "./weather-condition";

const InstantDetailsSchema = z.object({
    air_pressure_at_sea_level: z.number(),
    air_temperature: z.number(),
    cloud_area_fraction: z.number(),
    relative_humidity: z.number(),
    wind_from_direction: z.number(),
    wind_speed: z.number()
});

const SummarySchema = z.object({
    symbol_code: z.string()
});

const NextHoursSchema = z.object({
    summary: SummarySchema,
    details: z
        .object({
            precipitation_amount: z.number().optional()
        })
        .optional()
});

const DataSchema = z.object({
    instant: z.object({
        details: InstantDetailsSchema
    }),
    next_12_hours: NextHoursSchema.optional(),
    next_1_hours: NextHoursSchema.optional(),
    next_6_hours: NextHoursSchema.optional()
});

const TimeseriesSchema = z.object({
    time: z.string(),
    data: DataSchema
});

const MetaSchema = z.object({
    updated_at: z.string(),
    units: z.object({
        air_pressure_at_sea_level: z.string(),
        air_temperature: z.string(),
        cloud_area_fraction: z.string(),
        precipitation_amount: z.string(),
        relative_humidity: z.string(),
        wind_from_direction: z.string(),
        wind_speed: z.string()
    })
});

const PropertiesSchema = z.object({
    meta: MetaSchema,
    timeseries: z.array(TimeseriesSchema)
});

const GeometrySchema = z.object({
    type: z.string(),
    coordinates: z.array(z.number())
});

// JSON response from Met API location forecast
const MetResponseSchema = z.object({
    type: z.string(),
    geometry: GeometrySchema,
    properties: PropertiesSchema
});

// JSON response this API respons with
const WeatherNowResponseSchema = z.object({
    air_temperature: z.number().optional(),
    precipitation_rate: z.number().optional(),
    relative_humidity: z.number().optional(),
    wind_from_direction: z.number().optional(),
    wind_speed: z.number().optional(),
    wind_speed_of_gust: z.number().optional(),
    icon: z.string().optional()
});

const WeatherForecastOutput = MetResponseSchema.transform(({ properties }) => {
    const { data } = properties.timeseries[0];
    const { details } = data.instant;
    const { symbol_code } = data.next_1_hours.summary;
    return {
        ...details,
        icon: propOr("/01d.svg", symbol_code, weatherIconMapping)
    };
});

const WeatherNowQuerySchema = z.object({
    address: z.string().openapi({
        param: {
            name: "address",
            in: "query"
        },
        example: "Breiflåtveien 18"
    }),
    city: z.string().openapi({
        param: {
            name: "city",
            in: "query"
        },
        example: "Stavanger"
    })
});

export type MetResponse = z.infer<typeof MetResponseSchema>;
export type WeatherNowResponse = z.infer<typeof MetResponseSchema>;
export type Properties = z.infer<typeof PropertiesSchema>;
export type Timeseries = z.infer<typeof TimeseriesSchema>;
export type InstantDetails = z.infer<typeof InstantDetailsSchema>;

export {
    MetResponseSchema,
    WeatherNowResponseSchema,
    WeatherNowQuerySchema,
    WeatherForecastOutput
};
