import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(error);
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal Error";
    return response.status(statusCode).json({ message: message, error: error });
};
