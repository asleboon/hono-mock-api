import { http } from "../http";
import { GeoNorgeOutput } from "../models/geonorge";
import { parseTE } from "../validation";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

const getLocation = (address: string, city: string) => {
    return pipe(
        http.fetchGeoLocation(address, city),
        TE.chain(parseTE(GeoNorgeOutput))
    );
};

export const locationService = { getLocation };
