import { Router } from "express";

const router = Router();

// routes الأساسية
router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
