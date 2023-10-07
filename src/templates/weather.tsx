import { Layout } from "./layout";
import { z } from "@hono/zod-openapi";
import { FC } from "hono/jsx";
import { WeatherNowResponseSchema } from "../models/met";

type WeatherPageProps = {
    weather: z.infer<typeof WeatherNowResponseSchema>;
};

export const WeatherPage: FC<WeatherPageProps> = ({ weather }) => {
    const { icon } = weather;
    return (
        <Layout>
            <h1 class="font-montserat py-12 text-4xl">Weather in Sandnes right now</h1>
            <img alt="" src={`/static/${icon}`} />
            <pre>{JSON.stringify(weather, null, 4)}</pre>
        </Layout>
    );
};
