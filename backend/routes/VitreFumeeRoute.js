import express from "express";
import {
      getVitreFumees,
      getVitreFumeeById,
      createVitreFumee,
      updateVitreFumee,
      deleteVitreFumee,
      upload,
      getVitreFumeeCount,
      getMaxVitrefumeeNo
} from "../controllers/VitreFumee.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/vitreFumees',verifyUser, getVitreFumees);
router.get('/vitreFumees/count',verifyUser, getVitreFumeeCount);
router.get('/vitreFumees/maxVitrefumeeNo',verifyUser, getMaxVitrefumeeNo);
router.get('/vitreFumees/:id',verifyUser, getVitreFumeeById);
router.post('/vitreFumees',verifyUser,upload,createVitreFumee);
router.patch('/vitreFumees/:id',verifyUser, updateVitreFumee);
router.delete('/vitreFumees/:id',verifyUser, deleteVitreFumee);
// "multer": "^1.4.5-lts.1",
export default router;