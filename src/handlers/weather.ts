import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { endTime, startTime } from "hono/timing";
import { locationService, weatherService } from "../services";
import { inMemoryCache } from "../cache/in-memory-cache";
import { logTE, logTimeTE } from "../utils/log";

const getWeatherNow = async (c: any) => {
    startTime(c, "now");
    const { address, city } = c.req.valid("query");

    return pipe(
        locationService.getLocation(address, city),
        TE.chain(({ lon, lat }) => weatherService.getWeatherNow(lon, lat)),
        TE.fold(
            error => () => {
                const x = JSON.stringify(error);
                return c.jsonT({ status: "Error", message: `${x}` }, 500);
            },
            value => () => {
                endTime(c, "now");
                inMemoryCache.set(c.req.url, {
                    content: value,
                    timestamp: Date.now()
                });
                return c.jsonT(value, 200);
            }
        )
    )();
};

// 16 sekunder what the fuck??
const getWeatherHistoric = async (c: any) => {
    startTime(c, "historic");
    const { address, city, from, to } = c.req.valid("query");

    console.time("a");
    return pipe(
        locationService.getLocation(address, city),
        logTimeTE("a", "step1"),
        TE.chain(({ lon, lat }) =>
            weatherService.getNearestWeatherStation(lon, lat)
        ),

        logTimeTE("a", "step2"),
        TE.chain(stationId =>
            weatherService.getAirTemperatureObservations(stationId, from, to)
        ),
        logTimeTE("a", "step3"),
        TE.fold(
            error => () => {
                return c.jsonT({ status: "Error", message: error.error }, 500);
            },
            value => () => {
                logTimeTE("a", "step4");
                console.timeEnd("a");
                endTime(c, "historic");
                return c.jsonT(value, 200);
            }
        )
    )();
};

export const weatherHandler = {
    getWeatherNow,
    getWeatherHistoric
};
