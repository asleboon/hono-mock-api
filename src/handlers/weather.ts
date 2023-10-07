import { R, pipe } from "@mobily/ts-belt";
import * as TE from "fp-ts/TaskEither";
import { endTime, startTime } from "hono/timing";
import { locationService, weatherService } from "../services";
import { inMemoryCache } from "../cache/in-memory-cache";

const getWeatherNow = async (c: any) => {
    startTime(c, "now");
    const { city, address } = c.req.valid("query");

    const locationResult = await locationService.getLocation(address, city);

    if (R.isError(locationResult)) {
        return c.jsonT(locationResult._0, 404);
    }

    const { lon, lat } = pipe(locationResult, R.getExn);

    return pipe(
        weatherService.getWeatherNow(lon, lat),
        TE.fold(
            error => () => {
                const x = JSON.stringify(error);
                return c.jsonT({ status: "Error", message: `${x}` }, 500);
            },
            value => () => {
                endTime(c, "test");
                inMemoryCache.set(c.req.url, {
                    content: value,
                    timestamp: Date.now()
                });
                return c.jsonT(value, 200);
            }
        )
    )();
};

const getWeatherHistoric = async (c: any) => {
    startTime(c, "historic");
    const { city, address, from, to } = c.req.valid("query");

    const locationResult = await locationService.getLocation(address, city);

    if (R.isError(locationResult)) {
        endTime(c, "historic");
        return c.jsonT(locationResult._0, 404);
    }

    const { lon, lat } = pipe(locationResult, R.getExn);
    const stationResult = await weatherService.getNearestWeatherStation(
        lon,
        lat
    );

    if (R.isError(stationResult)) {
        endTime(c, "historic");
        return c.jsonT(stationResult._0, 500);
    }

    const stationId = pipe(stationResult, R.getExn);
    const observationsResult =
        await weatherService.getAirTemperatureObservations(stationId, from, to);

    if (R.isError(observationsResult)) {
        endTime(c, "historic");
        return c.jsonT(stationResult._0, 500);
    }

    const observations = pipe(observationsResult, R.getExn);

    inMemoryCache.set(c.req.url, {
        content: observations,
        timestamp: Date.now()
    });

    endTime(c, "historic");
    return c.jsonT(observations);
};

export const weatherHandler = {
    getWeatherNow,
    getWeatherHistoric
};
