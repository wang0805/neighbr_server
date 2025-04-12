import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

//TLDR: if token is there, grab it into the req.user object and check their roles
// They are then added to routes in index.ts
export const authMiddleware = (allowedRules: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // token comes from api.ts on frontend where we set the authorization on headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded["custom:role"] || "";
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRules.includes(userRole.toLowerCase());
      if (!hasAccess) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }
    } catch (error) {
      console.error("failed to decode token", error);
      res.status(400).json({ message: "Invalid Token" });
      return;
    }
    next();
  };
};
