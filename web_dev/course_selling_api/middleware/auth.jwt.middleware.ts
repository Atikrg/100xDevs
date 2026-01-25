import type { NextFunction } from "express"
import type { Request, Response } from "express"
import { verifyJwtToken } from "../handler"
import { Role } from "../generated/prisma/enums";
import { success } from "zod";
import type { JwtPayload } from "../types/auth.types";





export const verifyJwtTokenMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const authentication = request.headers.authorization;

        if (!authentication?.startsWith("Bearer ")) {
            return response.status(401).json({ message: "Unauthorized user" });
        }

        const token: string | undefined = authentication.split(" ")[1];

        if (!token) {
            return response.status(401).json({ message: "Unauthorized user" });

        }

        const verifyToken = verifyJwtToken(token);

        request.user = verifyToken as { id: string; role: Role };
        next();

    } catch (error: any) {
        return response.status(401).json({
            success: "fail",
            message: "Invalid token",
        });
    }
};


