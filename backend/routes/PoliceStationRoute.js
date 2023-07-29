import express from "express";


import { createPoliceStation, deletePoliceStation, getPoliceStationById, getPoliceStations, updatePoliceStation } from "../controllers/PoliceStation.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/policeStations',verifyUser, getPoliceStations);
router.get('/policeStations/:id',verifyUser, getPoliceStationById);
router.post('/policeStations',verifyUser, createPoliceStation);
router.patch('/policeStations/:id',verifyUser, updatePoliceStation);
router.delete('/policeStations/:id',verifyUser, deletePoliceStation);

export default router;