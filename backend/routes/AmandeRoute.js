import express from "express";
import {
   getAmandes,updateAmande
} from "../controllers/Amande.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();
  
 
router.get('/amandes', verifyUser, adminOnly, getAmandes);
router.patch('/amandes/:id',verifyUser, adminOnly, updateAmande);


export default router;