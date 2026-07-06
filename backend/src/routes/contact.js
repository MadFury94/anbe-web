import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
  const { name, company, email, phone, scope, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }
  // TODO: integrate EmailJS or SMTP here
  console.log("Contact form submission:", { name, company, email, scope });
  res.json({ success: true, message: "Message received. We will respond within one business day." });
});

export default router;
