import { z } from "@hono/zod-openapi";

const GeometrySchema = z.object({
  type: z.string(),
  coordinates: z.array(z.number()),
});

const UnitsSchema = z.object({
  air_temperature: z.string(),
  precipitation_amount: z.string(),
  precipitation_rate: z.string(),
  relative_humidity: z.string(),
  wind_from_direction: z.string(),
  wind_speed: z.string(),
  wind_speed_of_gust: z.string(),
});

const MetaSchema = z.object({
  updated_at: z.string(),
  units: UnitsSchema,
  radar_coverage: z.string(),
});

const InstantDetailsSchema = z.object({
  air_temperature: z.number().optional(),
  precipitation_rate: z.number(),
  relative_humidity: z.number().optional(),
  wind_from_direction: z.number().optional(),
  wind_speed: z.number().optional(),
  wind_speed_of_gust: z.number().optional(),
});

const InstantSchema = z.object({
  details: InstantDetailsSchema,
});

const Next1_HoursDetailsSchema = z.object({
  precipitation_amount: z.number(),
});

const SummarySchema = z.object({
  symbol_code: z.string(),
});

const Next1_HoursSchema = z.object({
  summary: SummarySchema,
  details: Next1_HoursDetailsSchema,
});

const DataSchema = z.object({
  instant: InstantSchema,
  next_1_hours: Next1_HoursSchema.optional(),
});

const TimeserySchema = z.object({
  time: z.string(),
  data: DataSchema,
});

const PropertiesSchema = z.object({
  meta: MetaSchema,
  timeseries: z.array(TimeserySchema),
});

const MetResponseSchema = z.object({
  type: z.string(),
  geometry: GeometrySchema,
  properties: PropertiesSchema,
});

const WeatherNowResponseSchema = z.object({
  air_temperature: z.number().optional(),
  precipitation_rate: z.number(),
  relative_humidity: z.number().optional(),
  wind_from_direction: z.number().optional(),
  wind_speed: z.number().optional(),
  wind_speed_of_gust: z.number().optional(),
  icon: z.string().optional(),
});

export {
  MetResponseSchema,
  GeometrySchema,
  PropertiesSchema,
  MetaSchema,
  UnitsSchema,
  TimeserySchema,
  DataSchema,
  InstantSchema,
  InstantDetailsSchema,
  Next1_HoursSchema,
  Next1_HoursDetailsSchema,
  SummarySchema,
  WeatherNowResponseSchema,
};
