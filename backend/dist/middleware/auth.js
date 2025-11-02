"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jwt_js_1 = require("../utils/jwt.js");
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, jwt_js_1.verifyToken)(token);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.protect = protect;
