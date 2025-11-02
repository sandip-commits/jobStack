"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getResumesByUser = exports.createResume = void 0;
// ✅ Correct - Use the package name
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createResume = async (data) => {
    return await prisma.resume.create({
        data,
    });
};
exports.createResume = createResume;
const getResumesByUser = async (userId) => {
    return await prisma.resume.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};
exports.getResumesByUser = getResumesByUser;
const getResumeById = async (id) => {
    return await prisma.resume.findUnique({
        where: { id },
    });
};
exports.getResumeById = getResumeById;
const updateResume = async (id, data) => {
    return await prisma.resume.update({
        where: { id },
        data,
    });
};
exports.updateResume = updateResume;
const deleteResume = async (id) => {
    return await prisma.resume.delete({
        where: { id },
    });
};
exports.deleteResume = deleteResume;
