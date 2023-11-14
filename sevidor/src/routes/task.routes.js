import { Router } from "express";
import { getArte, getArteId, createArte, updateArte, deleteArte } from "../controllers/task.controller.js";
import { requiredAuth } from "../middlewares/tokenValidation.js"
import { validateSchema } from "../middlewares/validator.middlewares.js"
import { createTaskSchema } from "../schemas/task.schema.js";
// import upload from "../multerConfig.js";

const router = Router()

router.get( "/artes", requiredAuth, getArte )
router.get( "/arte/:id", requiredAuth, getArteId )
router.post( "/arte", requiredAuth, createArte )
router.put( "/arte/:id", updateArte )
router.delete( "/arte/:id", requiredAuth, deleteArte )

export default router