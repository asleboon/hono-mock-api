import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <title>Weather API</title>
      </head>
      <body class="font-roboto w-full flex flex-col items-center justify-center">
        {props.children}
      </body>
    </html>
  );
};
