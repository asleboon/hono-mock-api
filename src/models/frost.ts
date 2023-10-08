import { z } from "@hono/zod-openapi";

const LevelSchema = z.object({
    levelType: z.string(),
    unit: z.string(),
    value: z.number()
});

const ObservationsSchema = z.object({
    elementId: z.string(),
    value: z.number(),
    unit: z.string(),
    level: LevelSchema,
    timeOffset: z.string(),
    timeResolution: z.string(),
    timeSeriesId: z.number(),
    performanceCategory: z.string(),
    exposureCategory: z.string(),
    qualityCode: z.number()
});

const DataSchemaObservationResponse = z.object({
    sourceId: z.string(),
    referenceTime: z.string().datetime(),
    observations: z.array(ObservationsSchema)
});

const ObservationResponseSchema = z.object({
    "@context": z.string(),
    "@type": z.literal("ObservationResponse"),
    apiVersion: z.string(),
    license: z.string().url(),
    createdAt: z.string().datetime(),
    queryTime: z.number(),
    currentItemCount: z.number(),
    itemsPerPage: z.number(),
    offset: z.number(),
    totalItemCount: z.number(),
    currentLink: z.string().url(),
    data: z.array(DataSchemaObservationResponse)
});

const PointSchema = z.object({
    "@type": z.literal("Point"),
    coordinates: z.array(z.number()).min(2).max(2),
    nearest: z.boolean()
});

const DataSchemaSourceResponse = z.object({
    "@type": z.literal("SensorSystem"),
    id: z.string(),
    name: z.string(),
    shortName: z.string(),
    country: z.string(),
    countryCode: z.string(),
    geometry: PointSchema,
    distance: z.number(),
    masl: z.number(),
    validFrom: z.string().datetime(),
    county: z.string(),
    countyId: z.number(),
    municipality: z.string(),
    municipalityId: z.number(),
    stationHolders: z.array(z.string()),
    externalIds: z.array(z.string()),
    wigosId: z.string()
});

const SourceResponseSchema = z.object({
    "@context": z.string(),
    "@type": z.literal("SourceResponse"),
    apiVersion: z.string(),
    license: z.string().url(),
    createdAt: z.string().datetime(),
    queryTime: z.number(),
    currentItemCount: z.number(),
    itemsPerPage: z.number(),
    offset: z.number(),
    totalItemCount: z.number(),
    currentLink: z.string().url(),
    data: z.array(DataSchemaSourceResponse)
});

const WeatherHistoricQuerySchema = z.object({
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
    }),
    from: z
        .string()
        .datetime()
        .openapi({
            param: {
                name: "from",
                in: "query"
            },
            example: "2023-01-01T00:00:00Z"
        }),
    to: z
        .string()
        .datetime()
        .openapi({
            param: {
                name: "to",
                in: "query"
            },
            example: "2023-01-02T00:00:00Z"
        })
});

const WeatherHistoricResponseSchema = z.array(
    z.object({
        data: z.array(
            z.object({
                from: z.string().datetime(),
                value: z.number()
            })
        )
    })
);

const AirTemperatureOutput = ObservationResponseSchema.transform(({ data }) => {
    return data.map(d => ({
        from: d.referenceTime,
        value: d.observations[0].value
    }));
});

const StationOutput = SourceResponseSchema.transform(({ data }) => {
    return data[0].id;
});

export type WeatherStationResponse = z.infer<typeof SourceResponseSchema>;
export type AirTempResponse = z.infer<typeof ObservationResponseSchema>;
export type AirTempOutput = { from: string; value: number };

export {
    SourceResponseSchema,
    ObservationResponseSchema,
    WeatherHistoricQuerySchema,
    WeatherHistoricResponseSchema,
    AirTemperatureOutput,
    StationOutput
};
