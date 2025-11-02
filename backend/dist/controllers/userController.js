"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const userService = __importStar(require("../services/userService.js"));
const jwt_js_1 = require("../utils/jwt.js");
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" });
    }
};
exports.createUser = createUser;
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user" });
    }
};
exports.getUserById = getUserById;
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching users" });
    }
};
exports.getAllUsers = getAllUsers;
const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(parseInt(req.params.id), req.body);
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating user" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(parseInt(req.params.id));
        res.status(200).json({ message: "User deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting user" });
    }
};
exports.deleteUser = deleteUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = (0, jwt_js_1.generateToken)(user.id);
        res.status(200).json({ token, userId: user.id, name: user.name });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in" });
    }
};
exports.loginUser = loginUser;
