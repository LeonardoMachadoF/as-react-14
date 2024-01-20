import { ZodError } from "zod";

export type ErrorItem = {
    field: string;
    message: string;
}

export function getErrorForZod(error: ZodError) {
    const errorList: ErrorItem[] = [];

    for (let i in error.errors) {
        errorList.push({
            field: error.errors[i].path[0].toString(),
            message: error.errors[i].message
        })
    }

    return errorList;
}