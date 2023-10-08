import {
    AirTempOutput,
    AirTempResponse,
    AirTemperatureOutput,
    StationOutput,
    WeatherStationResponse
} from "../models/frost";
import * as TE from "fp-ts/TaskEither";
import { http } from "../http";
import { pipe } from "fp-ts/function";
import { WeatherForecastOutput } from "../models/met";
import { parseTE } from "../validation";
import { AppError } from "../models/error";

const getWeatherNow = (lon: number, lat: number) => {
    return pipe(
        http.fetchWeatherForecast(lon, lat),
        TE.chain(parseTE(WeatherForecastOutput))
    );
};

const transformStationResponse = (json: WeatherStationResponse): string => {
    return json.data[0].id;
};

const transformAirTempResponse = (json: AirTempResponse): AirTempOutput[] => {
    return json.data.map(d => ({
        from: d.referenceTime,
        value: d.observations[0].value
    }));
};

const transformTE = <A extends any[], T>(
    fn: (...args: A) => T | Promise<T>
): ((...args: A) => TE.TaskEither<AppError, T>) => {
    return (...args: A) =>
        TE.tryCatch(
            () => Promise.resolve(fn(...args)), // Wrap the result in a Promise
            error => ({
                type: "ERROR",
                error: new Error(error as string)
            })
        );
};

const getNearestWeatherStation = (
    lon: number,
    lat: number
): TE.TaskEither<AppError, string> => {
    return pipe(
        http.fetchWeatherStation(lon, lat),
        TE.chain(parseTE(StationOutput))
        // TE.chain(transformTE(transformStationResponse))
    );
};

const getAirTemperatureObservations = (
    stationId: string,
    from: string,
    to: string
): TE.TaskEither<AppError, AirTempOutput[]> => {
    return pipe(
        http.fetchAirTempObservations(stationId, from, to),
        TE.chain(parseTE(AirTemperatureOutput))
        // TE.chain(transformTE(transformAirTempResponse))
    );
};

export const weatherService = {
    getWeatherNow,
    getNearestWeatherStation,
    getAirTemperatureObservations
};
