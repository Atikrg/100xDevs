import type { JwtPayload } from "./types/auth.types"; // adjust path

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export { };
