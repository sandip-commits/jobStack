import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

import resumeRoutes from "./routes/resumeRoutes.js";
// import analysisRoutes from "./routes/analysisRoutes";
// import recommendationRoutes from "./routes/recommendationRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/resumes", resumeRoutes);
// app.use("/api/analysis", analysisRoutes);
// app.use("/api/recommendations", recommendationRoutes);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
