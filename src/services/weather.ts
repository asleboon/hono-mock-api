import {
    AirTempOutput,
    AirTemperatureOutput,
    StationOutput
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

const getNearestWeatherStation = (
    lon: number,
    lat: number
): TE.TaskEither<AppError, string> => {
    return pipe(
        http.fetchWeatherStation(lon, lat),
        TE.chain(parseTE(StationOutput))
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
    );
};

export const weatherService = {
    getWeatherNow,
    getNearestWeatherStation,
    getAirTemperatureObservations
};
