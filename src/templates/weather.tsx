import { Layout } from "./layout";
import { z } from "@hono/zod-openapi";
import { FC } from "hono/jsx";
import { WeatherNowResponseSchema } from "../models/met";
import { AppError } from "../models/error";

type WeatherPageProps = {
    weather: z.infer<typeof WeatherNowResponseSchema>;
};

export const WeatherPage: FC<WeatherPageProps> = ({ weather }) => {
    const { icon } = weather;
    return (
        <Layout>
            <h1 class="font-montserat py-12 text-4xl">
                Weather in Sandnes right now
            </h1>
            <img alt="" src={`/static/${icon}`} />
            <pre>{JSON.stringify(weather, null, 4)}</pre>
        </Layout>
    );
};

export const WeatherErrorPage: FC<{ error: AppError }> = ({ error }) => {
    console.log(error);
    return (
        <Layout>
            <h1 class="font-montserat py-12 text-4xl">Ooopsie 😅 No weather</h1>
            <img alt="" src={`/static/01d.svg`} />
            <pre>{JSON.stringify(error)}</pre>
        </Layout>
    );
};
