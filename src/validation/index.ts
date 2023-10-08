import { AppError } from "../models/error";
import { z } from "@hono/zod-openapi";
import * as TE from "fp-ts/TaskEither";

export const parseTE =
    <T>(schema: z.ZodType<T, any, any>) =>
    (input: unknown): TE.TaskEither<AppError, T> => {
        return TE.tryCatch(
            () => Promise.resolve(schema.parse(input)),
            error => ({ type: "PARSE_ERROR", error: error as z.ZodError })
        );
    };
