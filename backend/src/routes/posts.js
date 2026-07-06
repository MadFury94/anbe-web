import { Router } from "express";
const router = Router();

const posts = [
  { id:1, slug:"smokeless-flare-design", title:"The Engineering Case for Smokeless Flare Systems", category:"Engineering", date:"June 2026" },
  { id:2, slug:"pipeline-integrity-niger-delta", title:"Pipeline Integrity Management in the Niger Delta", category:"Field Work", date:"May 2026" },
  { id:3, slug:"indigenous-engineering-capacity", title:"Building Indigenous Engineering Capacity in Nigeria", category:"Company", date:"April 2026" },
  { id:4, slug:"hse-permit-to-work", title:"Why Permit-to-Work Systems Save Lives", category:"Safety", date:"March 2026" },
  { id:5, slug:"fabrication-workshop-expansion", title:"ANBE Expands Port Harcourt Fabrication Workshop", category:"Fabrication", date:"February 2026" },
  { id:6, slug:"epc-contracting-nigeria", title:"EPC Contracting in Nigeria's Oil & Gas Sector", category:"Industry", date:"January 2026" },
];

router.get("/", (req, res) => res.json(posts));
router.get("/:slug", (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

export default router;
