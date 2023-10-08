import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { promises as fs } from "fs";

const appendToLog = async (message: string) => {
    await fs.appendFile("logging.log", message + "\n");
};

export const logTE = <E, A>(te: TE.TaskEither<E, A>): TE.TaskEither<E, A> => {
    return pipe(
        te,
        TE.fold(
            error => {
                console.error("Error:", error);
                return TE.left(error);
            },
            value => {
                console.log("Value:", value);
                return TE.right(value);
            }
        )
    );
};

// write to file?
export const logTimeTE =
    (label: string, extra?: string) =>
    <E, A>(te: TE.TaskEither<E, A>): TE.TaskEither<E, A> => {
        return pipe(
            te,
            TE.fold(
                error => TE.left(error),
                value => {
                    const first = extra === "step1" ? "\n" : "";
                    const logMessage = `${first}${new Date().toISOString()} - ${label}: ${
                        extra || ""
                    }`;

                    appendToLog(logMessage);
                    console.timeLog(label, extra);
                    return TE.right(value);
                }
            )
        );
    };
