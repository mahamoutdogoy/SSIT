import express from "express";
import {
      getPenalties,
      getPenaltyById,
      createPenalty,
      updatePenalty,
      deletePenalty
} from "../controllers/Penalty.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/penalties',verifyUser, getPenalties);
router.get('/penalties/:id',verifyUser, getPenaltyById);
router.post('/penalties',verifyUser, createPenalty);
router.patch('/penalties/:id',verifyUser, updatePenalty);
router.delete('/penalties/:id',verifyUser, deletePenalty);

export default router;