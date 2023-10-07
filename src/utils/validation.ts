import { R } from "@mobily/ts-belt";
import { z } from "@hono/zod-openapi";

type ParseError =
    | { type: "ZodError"; message: string; error: any }
    | { type: "NotFound"; message: string };

type ParseResult<T> = { data: T };

export const safeParse = <T>(
    schema: z.ZodSchema<T>,
    data: unknown
): R.Result<ParseResult<T>, ParseError> => {
    const parsed = schema.safeParse(data);

    if (parsed.success) {
        return R.Ok({ data: parsed.data });
    }

    return R.Error({
        type: "ZodError",
        message: "Validation error",
        error: ""
    });
};
