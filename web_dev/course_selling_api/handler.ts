
import jwt from "jsonwebtoken";
import { email } from "zod";
import type { JwtPayload } from "./types/auth.types";



const JWT_SECRET = process.env.JWT_SECRET as string;


export const generateJwtToken = (payload: JwtPayload) => {
    return jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: "7d"
        }

    )
}

export const verifyJwtToken = (token: string) => {
    return jwt.verify(
        token,
        JWT_SECRET
    )
}

