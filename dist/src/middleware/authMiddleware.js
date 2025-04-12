"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//TLDR: if token is there, grab it into the req.user object and check their roles
// They are then added to routes in index.ts
// This middleware is used to protect routes and check user roles
const authMiddleware = (allowedRules) => {
    return (req, res, next) => {
        var _a;
        // token comes from api.ts on frontend where we set the authorization on headers
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        try {
            // decode the token to get the user id and role
            const decoded = jsonwebtoken_1.default.decode(token);
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
        }
        catch (error) {
            console.error("failed to decode token", error);
            res.status(400).json({ message: "Invalid Token" });
            return;
        }
        next();
    };
};
exports.authMiddleware = authMiddleware;
