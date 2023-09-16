import { ZodSchema } from "zod";

export const parseResponse =
  <T>(schema: ZodSchema<T>) =>
  async (responsePromise: Promise<unknown>): Promise<T> => {
    try {
      const response = await responsePromise;
      return schema.parse(response);
    } catch (err: unknown) {
      throw new Error(`Validation error: ${String(err)}`);
    }
  };
