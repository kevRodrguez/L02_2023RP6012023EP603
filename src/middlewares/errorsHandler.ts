import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error interno del servidor!!!";

    res.status(statusCode).json({
        status: "Error",
        message
    });
};