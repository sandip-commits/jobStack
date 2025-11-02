import { Response } from "express";
import * as resumeService from "../services/resumeService.js";
import { AuthRequest } from "../middleware/auth.js"; // use our extended Request

// Create Resume (use logged-in userId)
export const createResume = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await resumeService.createResume({
      ...req.body,
      userId: req.userId!, // get userId from JWT
    });
    res.status(201).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating resume" });
  }
};

// Get all resumes for logged-in user
export const getResumes = async (req: AuthRequest, res: Response) => {
  try {
    const resumes = await resumeService.getResumesByUser(req.userId!);
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching resumes" });
  }
};

// Get resume by ID
export const getResumeById = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const resume = await resumeService.getResumeById(id);
    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching resume" });
  }
};

// Update resume (only owner can update)
export const updateResume = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await resumeService.updateResume(id, req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating resume" });
  }
};

// Delete resume (only owner can delete)
export const deleteResume = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    await resumeService.deleteResume(id);
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting resume" });
  }
};
