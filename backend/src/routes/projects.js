import { Router } from "express";
const router = Router();

const projects = [
  { id:1, slug:"smokeless-flare-retrofit", title:"Smokeless Flare Stack Retrofit", client:"Niger Delta Terminal", category:"flare", status:"completed", year:2024 },
  { id:2, slug:"trunkline-replacement", title:"18km Trunkline Replacement", client:"Delta State Flowline", category:"pipeline", status:"completed", year:2023 },
  { id:3, slug:"remote-ignition-upgrade", title:"Remote Ignition System Upgrade", client:"Rivers State Facility", category:"fabrication", status:"completed", year:2024 },
  { id:4, slug:"tie-in-reinstatement", title:"Tie-In & Right-of-Way Reinstatement", client:"Bayelsa Flowstation", category:"pipeline", status:"completed", year:2024 },
  { id:5, slug:"vertical-flare-installation", title:"Vertical Smokeless Flare Installation", client:"Independent E&P Operator", category:"flare", status:"completed", year:2025 },
  { id:6, slug:"combustion-overhaul", title:"Combustion Equipment Overhaul", client:"Onshore Processing Facility", category:"maintenance", status:"ongoing", year:2025 },
];

router.get("/", (req, res) => {
  const { category } = req.query;
  const result = category ? projects.filter(p => p.category === category) : projects;
  res.json(result);
});

router.get("/:slug", (req, res) => {
  const project = projects.find(p => p.slug === req.params.slug);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

export default router;
