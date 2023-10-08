import { inMemoryCache } from "../cache/in-memory-cache";
import { appEnv } from "../environment";
import { getCacheKeyFromUrl } from "../middleware";
import { AppError } from "../models/error";
import * as TE from "fp-ts/TaskEither";

export const fetchAsync = async (
    url: string,
    options?: FetchRequestInit
): Promise<unknown> => {
    try {
        const cacheKey = getCacheKeyFromUrl(new URL(url));
        const cacheEntry = inMemoryCache.get(cacheKey);
        if (cacheEntry) {
            return cacheEntry.content;
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`[${response.status}]: ${error}`);
        }
        const data = await response.json();
        inMemoryCache.set(cacheKey, { content: data, timestamp: Date.now() });
        return data;
    } catch (err: unknown) {
        throw new Error(`FetchAsync error: ${err}`);
    }
};

const fetchWeatherStation = (lon: number, lat: number) =>
    // get nearest station that has air_temp.
    fetchAsync(
        `https://frost.met.no/sources/v0.jsonld?elements=air_temperature&geometry=nearest(POINT(${lon} ${lat}))`,
        {
            headers: {
                Authorization: `Basic ${btoa(
                    `${appEnv.MET_CLIENT_ID}:${appEnv.MET_CLIENT_SECRET}}`
                )}`
            }
        }
    );

const fetchAirTempObservations = (sourceId: string, from: string, to: string) =>
    // get observation data of type air_temp from station.
    fetchAsync(
        `https://frost.met.no/observations/v0.jsonld?sources=${sourceId}&referencetime=${from}/${to}&elements=air_temperature`,
        {
            headers: {
                Authorization: `Basic ${btoa(
                    `${appEnv.MET_CLIENT_ID}:${appEnv.MET_CLIENT_SECRET}}`
                )}`
            }
        }
    );

const fetchWeatherNow = (lon: number, lat: number) =>
    fetchAsync(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
        {
            headers: { "User-Agent": "test hum.leif@gmail.com" }
        }
    );

const fetchGeoLocation = (city: string, address: string) =>
    fetchAsync(
        `https://ws.geonorge.no/adresser/v1/sok?sok=${address} ${city}&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=0&asciiKompatibel=true`
    );

const fetchTE = <A extends any[]>(
    fn: (...args: A) => Promise<unknown>
): ((...args: A) => TE.TaskEither<AppError, unknown>) => {
    return (...args: A) =>
        TE.tryCatch(
            () => fn(...args),
            error => ({
                type: "FETCH_ERROR",
                error: new Error(error as string)
            })
        );
};

export const http = {
    fetchWeatherForecast: fetchTE(fetchWeatherNow),
    fetchWeatherStation: fetchTE(fetchWeatherStation),
    fetchAirTempObservations: fetchTE(fetchAirTempObservations),
    fetchGeoLocation: fetchTE(fetchGeoLocation)
};
