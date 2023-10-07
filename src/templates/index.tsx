import type { FC } from "hono/jsx";
import { Layout } from "./layout";
const websites = [
  { label: "Forecast", href: "/weather" },
  {
    label: "Historic",
    href: "/api/v1/weather/historic?address=Langgata%2097&city=Sandnes&from=2023-09-17T00:00:00Z&to=2023-09-18T00:00:00Z",
  },
];

export const FrontPage: FC = () => {
  return (
    <Layout>
      <h1 class="font-montserat py-12 text-4xl">Weather API</h1>
      <p class="prose prose-xl pb-8">
        Want to look at the OpenAPI / Swagger documentation?
      </p>
      <a
        class="block w-[200px] cursor-pointer text-lg text-center bg-stone-900 hover:bg-stone-700 text-stone-100 px-4 py-2 rounded-md border-2 border-white shadow-[0_0_0_2px] shadow-stone-900"
        href="/swagger"
      >
        Check it out here!
      </a>
      <h2 class="font-montserat text-2xl pt-8">Test it out in the browser</h2>
      <ul class="flex flex-wrap pt-4 justify-center w-[600px]">
        {websites.map(({ label, href }) => (
          <li class="p-4">
            <a
              class="block w-[200px] cursor-pointer text-lg text-center bg-amber-900 hover:bg-amber-700 text-amber-100 px-4 py-2 rounded-md border-2 border-white shadow-[0_0_0_2px] shadow-amber-900"
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
