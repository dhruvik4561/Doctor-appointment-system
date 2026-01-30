import express from "express";
import {  addPatient, getAllPatients,checkPatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/add", addPatient);
router.get("/all", getAllPatients);

router.get('/check/:phone',checkPatient);

export default router;
