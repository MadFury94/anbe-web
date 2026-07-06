import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contact.js";
import projectsRouter from "./routes/projects.js";
import postsRouter from "./routes/posts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "https://anbenig.com"] }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "ANBE API" }));
app.use("/api/contact", contactRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/posts", postsRouter);

app.listen(PORT, () => console.log(`ANBE API running on http://localhost:${PORT}`));
