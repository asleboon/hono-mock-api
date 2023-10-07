import { A, R, pipe as beltPipe, O, D } from "@mobily/ts-belt";
import {
    ObservationResponseSchema,
    SourceResponseSchema
} from "../models/frost";
import { safeParse } from "../utils/validation";
import * as TE from "fp-ts/TaskEither";
import { http } from "../http";
import { pipe } from "fp-ts/function";
import { WeatherForecastOutput } from "../models/met";
import { parseTE } from "../validation";

const getWeatherNow = (lon: number, lat: number) => {
    return pipe(
        http.fetchWeatherForecast(lon, lat),
        TE.chain(parseTE(WeatherForecastOutput))
    );
};

const getNearestWeatherStation = async (lon: number, lat: number) => {
    const weatherStationResult = await http.fetchWeatherStation(lon, lat);

    return beltPipe(
        weatherStationResult,
        res => safeParse(SourceResponseSchema, res),
        R.flatMap(value =>
            beltPipe(
                value.data,
                D.get("data"),
                O.flatMap(A.head),
                O.flatMap(D.get("id")),
                O.toResult({
                    type: "NotFound",
                    message: "Weather station not found"
                })
            )
        )
    );
};

const getAirTemperatureObservations = async (
    stationId: string,
    from: string,
    to: string
) => {
    const observations = await http.fetchAirTempObservations(
        stationId,
        from,
        to
    );

    const data = beltPipe(
        observations,
        ObservationResponseSchema.parse,
        D.get("data"),
        O.flatMap(
            A.filterMap(value => ({
                from: D.get(value, "referenceTime"),
                value: O.flatMap(A.head(value.observations), D.get("value"))
            }))
        ),
        O.toResult({ type: "NotFound", message: "Observations not found" })
    );

    return data;
};

export const weatherService = {
    getWeatherNow,
    getNearestWeatherStation,
    getAirTemperatureObservations
};
