import { Router } from "express";
import { createPreference, handleWebhook } from "../controllers/paymentController";

const router = Router();

router.post("/create-preference", createPreference);
router.post("/webhook", handleWebhook);

export default router;