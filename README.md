# Weather API

Proxy API that fetches weather from MET.

## Tech stack

Made with Bun, Hono, zod and ts-belt.

## How it works

Currently have two endpoints.

GET /weather/now
GET /weather/historic

To make it easier to get the weather data we also
use the GeoNorge API from Kartverket.

With this API we can translate and address to a geo location (coordinates).

## Getting Started

Install bun

```
curl -fsSL https://bun.sh/install | bash
```

```
bun install
bun run dev
```

```
open http://localhost:8080
```

## Documentation

Swagger docs for this API can be found at.


FROST API
https://frost.met.no/api.html#/
Get weather observation (historic weather data)

MET API (locationforecast)
https://api.met.no/weatherapi/locationforecast/2.0/documentation



## TODO

- Update readme
- Handle errors gracefully
- Will I always get data from a station? what about missing values?
- What happens when an error occurs?
- Mock data with [zod-mock](https://www.npmjs.com/package/@anatine/zod)
- Dockerfile
- Pulumi deployment
