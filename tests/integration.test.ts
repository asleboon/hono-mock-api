import { expect, test, describe } from "bun:test";
import { app } from "../src/index";

describe("GET /weather/now", () => {
  test("No params", async () => {
    const res = await app.request("/api/v1/weather/now");
    expect(res.status).toBe(400);
  });

  test("Ok", async () => {
    const res = await app.request(
      "/api/v1/weather/now?address=Langgata%2097&city=Sandnes",
    );
    expect(res.status).toBe(200);
  });

  test("Bad address and city query params", async () => {
    const res = await app.request(
      "/api/v1/weather/now?address=Lanata%2097&city=Sanes",
    );
    expect(res.status).toBe(404);
  });
});
