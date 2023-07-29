import express from "express";
import {
   getAmandes
} from "../controllers/Amande.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();
  
 
router.get('/amandes', verifyUser, adminOnly, getAmandes);


export default router;