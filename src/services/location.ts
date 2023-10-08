import { http } from "../http";
import { AppError } from "../models/error";
import {
    GeoLocation,
    GeoNorgeOutput,
    GeoNorgeResponse
} from "../models/geonorge";
import { parseTE } from "../validation";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

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

const transformGeoLocation = (json: GeoNorgeResponse): GeoLocation => {
    return json.adresser[0].representasjonspunkt;
};

const getLocation = (address: string, city: string) => {
    return pipe(
        http.fetchGeoLocation(address, city),
        TE.chain(transformTE(transformGeoLocation))
        // TE.chain(parseTE(GeoNorgeOutput))
    );
};

export const locationService = { getLocation };
