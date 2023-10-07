import type { FC } from "hono/jsx";

export const SwaggerUI: FC = () => {
    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
                    rel="stylesheet"
                />

                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="https://unpkg.com/htmx.org@1.9.5"></script>
                <title>Weather API</title>
            </head>
            <body>
                <redoc spec-url="/swagger"></redoc>
                <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"></script>
            </body>
        </html>
    );
};
