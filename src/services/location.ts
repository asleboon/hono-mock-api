// import { A, R, pipe, O, D } from "@mobily/ts-belt";
// import { GeoNorgeResponseSchema } from "../models/geonorge";
// import { safeParse } from "../utils/validation";
// import { http } from "../http";

import { http } from "../http";
import { GeoNorgeOutput } from "../models/geonorge";
import { parseTE } from "../validation";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

// const getLocation = async (address: string, city: string) => {
//   const geoNorgeResponse = await http.fetchGeoLocation(city, address);
//
//   return pipe(
//     geoNorgeResponse,
//     // parse json
//     (res) => safeParse(GeoNorgeResponseSchema, res),
//     // if parse goes ok, get lon and lat from json object
//     R.flatMap((value) =>
//       pipe(
//         value.data,
//         D.get("adresser"),
//         O.flatMap(A.head),
//         O.flatMap(D.get("representasjonspunkt")),
//         O.toResult({ type: "NotFound", message: "Location not found" }),
//       ),
//     ),
//   );
// };

const getLocation = async (address: string, city: string) => {
    return pipe(
        http.fetchGeoLocation(address, city),
        TE.chain(parseTE(GeoNorgeOutput))
    );
};

export const locationService = { getLocation };
