import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { endTime, startTime } from "hono/timing";
import { locationService, weatherService } from "../services";

const getWeatherNow = async (c: any) => {
    startTime(c, "now");
    const { address, city } = c.req.valid("query");

    return pipe(
        locationService.getLocation(address, city),
        TE.chain(({ lon, lat }) => weatherService.getWeatherNow(lon, lat)),
        TE.fold(
            error => () => {
                return c.jsonT({ status: "Error", message: error.error }, 500);
            },
            value => () => {
                endTime(c, "now");
                return c.jsonT(value, 200);
            }
        )
    )();
};

const getWeatherHistoric = async (c: any) => {
    startTime(c, "historic");
    const { address, city, from, to } = c.req.valid("query");

    return pipe(
        locationService.getLocation(address, city),
        TE.chain(({ lon, lat }) =>
            weatherService.getNearestWeatherStation(lon, lat)
        ),

        TE.chain(stationId =>
            weatherService.getAirTemperatureObservations(stationId, from, to)
        ),
        TE.fold(
            error => () => {
                return c.jsonT({ status: "Error", message: error.error }, 500);
            },
            value => () => {
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
