import type { FC } from "hono/jsx";

const Layout: FC = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <title>Test API</title>
      </head>
      <body class="font-roboto w-full flex flex-col items-center justify-center">
        {props.children}
      </body>
    </html>
  );
};

const endpoints = [
  { label: "GET /users", href: "/api/v1/users" },
  { label: "GET /users/1", href: "/api/v1/users/1" },
  { label: "GET /posts", href: "/api/v1/posts" },
  { label: "GET /posts/1", href: "/api/v1/posts/1" },
  // { label: "GET /albums", href: "/api/v1/albums" },
  // { label: "GET /albums/1", href: "/api/v1/albums/1" },
  // { label: "GET /photos", href: "/api/v1/photos" },
  // { label: "GET /users/1", href: "/api/v1/photos/1" },
];

export const FrontPage: FC = () => {
  return (
    <Layout>
      <h1 class="font-montserat py-12 text-4xl">Test API v1.0.0</h1>
      <ul class="flex flex-wrap justify-center w-[600px]">
        {endpoints.map(({ label, href }) => (
          <li class="p-4">
            <a
              class="block w-[200px] cursor-pointer text-xl text-center bg-stone-900 hover:bg-stone-700 text-stone-100 px-4 py-2 rounded-md border-2 border-white shadow-[0_0_0_2px] shadow-stone-900"
              href={href}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
