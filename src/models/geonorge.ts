import { z } from "@hono/zod-openapi";

const RepresentasjonspunktSchema = z.object({
    epsg: z.string(),
    lat: z.number(),
    lon: z.number()
});

const MetadataSchema = z.object({
    viserFra: z.number(),
    sokeStreng: z.string(),
    side: z.number(),
    treffPerSide: z.number(),
    totaltAntallTreff: z.number(),
    asciiKompatibel: z.boolean(),
    viserTil: z.number()
});

const AdresserSchema = z.object({
    adressenavn: z.string(),
    adressetekst: z.string(),
    adressetilleggsnavn: z.null().optional(),
    adressekode: z.number(),
    nummer: z.number(),
    bokstav: z.string(),
    kommunenummer: z.string(),
    kommunenavn: z.string(),
    gardsnummer: z.number(),
    bruksnummer: z.number(),
    festenummer: z.number(),
    undernummer: z.null().optional(),
    bruksenhetsnummer: z.array(z.string()),
    objtype: z.string(),
    poststed: z.string(),
    postnummer: z.string(),
    adressetekstutenadressetilleggsnavn: z.string(),
    stedfestingverifisert: z.boolean(),
    representasjonspunkt: RepresentasjonspunktSchema,
    oppdateringsdato: z.string()
});

const GeoNorgeResponseSchema = z.object({
    metadata: MetadataSchema,
    adresser: z.array(AdresserSchema)
});

const GeoNorgeOutput = GeoNorgeResponseSchema.transform(({ adresser }) => {
    return adresser[0].representasjonspunkt;
});

export type GeoLocation = z.infer<typeof RepresentasjonspunktSchema>;

export { RepresentasjonspunktSchema, GeoNorgeResponseSchema, GeoNorgeOutput };
