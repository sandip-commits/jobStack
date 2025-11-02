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
exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getResumes = exports.createResume = void 0;
const resumeService = __importStar(require("../services/resumeService.js"));
// Create Resume (use logged-in userId)
const createResume = async (req, res) => {
    try {
        const resume = await resumeService.createResume({
            ...req.body,
            userId: req.userId, // get userId from JWT
        });
        res.status(201).json(resume);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating resume" });
    }
};
exports.createResume = createResume;
// Get all resumes for logged-in user
const getResumes = async (req, res) => {
    try {
        const resumes = await resumeService.getResumesByUser(req.userId);
        res.json(resumes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching resumes" });
    }
};
exports.getResumes = getResumes;
// Get resume by ID
const getResumeById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const resume = await resumeService.getResumeById(id);
        res.json(resume);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching resume" });
    }
};
exports.getResumeById = getResumeById;
// Update resume (only owner can update)
const updateResume = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updated = await resumeService.updateResume(id, req.body);
        res.json(updated);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating resume" });
    }
};
exports.updateResume = updateResume;
// Delete resume (only owner can delete)
const deleteResume = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await resumeService.deleteResume(id);
        res.json({ message: "Resume deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting resume" });
    }
};
exports.deleteResume = deleteResume;
