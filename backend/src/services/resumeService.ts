// ✅ Correct - Use the package name
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ResumeInput {
  userId: number;
  title: string;
  fullName: string;
  email: string;
  phone?: string;
  education?: any;
  experience?: any;
  skills?: any;
  projects?: any;
  certifications?: any;
  other?: any;
  content?: string;
}

export const createResume = async (data: ResumeInput) => {
  return await prisma.resume.create({
    data,
  });
};

export const getResumesByUser = async (userId: number) => {
  return await prisma.resume.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getResumeById = async (id: number) => {
  return await prisma.resume.findUnique({
    where: { id },
  });
};

export const updateResume = async (id: number, data: Partial<ResumeInput>) => {
  return await prisma.resume.update({
    where: { id },
    data,
  });
};

export const deleteResume = async (id: number) => {
  return await prisma.resume.delete({
    where: { id },
  });
};
