import type { NextFunction, Request, Response } from "express";
import type { Role } from "../generated/prisma/enums";
import { success } from "zod";


export const requireRole = (role: Role) => (request: Request, response: Response, next: NextFunction) => {
    const userRole = request.user?.role;


    if (userRole !== role) {
        return response.status(403).json({
            success: "fail",
            message: "Forbidden"
        })
    }

    next();

}