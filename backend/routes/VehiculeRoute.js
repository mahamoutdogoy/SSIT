import express from "express";
import {
    getVehicules,
    getVehiculeById,
    createVehicule,
    updateVehicule,
    deleteVehicule,
    getVehiculeCount
} from "../controllers/Vehicule.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/vehicules',verifyUser, getVehicules);
router.get('/vehicules/count',verifyUser, getVehiculeCount);
router.get('/vehicules/:id',verifyUser, getVehiculeById);
router.post('/vehicules',verifyUser, createVehicule);
router.patch('/vehicules/:id',verifyUser, updateVehicule);
router.delete('/vehicules/:id',verifyUser, deleteVehicule);

export default router;