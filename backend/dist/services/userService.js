"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createUser = async (data) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt_1.default.hash(data.password, saltRounds);
    return await prisma.user.create({
        data: { ...data, password: hashedPassword },
    });
};
exports.createUser = createUser;
const getUserById = async (id) => {
    return await prisma.user.findUnique({ where: { id } });
};
exports.getUserById = getUserById;
const getAllUsers = async () => {
    return await prisma.user.findMany();
};
exports.getAllUsers = getAllUsers;
const updateUser = async (id, data) => {
    // If password is being updated, hash it
    if (data.password) {
        const saltRounds = 10;
        data.password = await bcrypt_1.default.hash(data.password, saltRounds);
    }
    return await prisma.user.update({ where: { id }, data });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return await prisma.user.delete({ where: { id } });
};
exports.deleteUser = deleteUser;
const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return null;
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        return null;
    return user;
};
exports.loginUser = loginUser;
