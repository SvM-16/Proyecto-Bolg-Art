import { Router } from "express";
import { getArte, getArteId, createArte, updateArte, deleteArte } from "../controllers/task.controller.js";
import { requiredAuth } from "../middlewares/tokenValidation.js"
import { validateSchema } from "../middlewares/validator.middlewares.js"
import { createTaskSchema } from "../schemas/task.schema.js";
import upload from "../multerConfig.js";

const router = Router()

router.get( "/tasks", requiredAuth, getArte )
router.get( "/task/:id", requiredAuth, getArteId )
router.post( "/task", requiredAuth, validateSchema(createTaskSchema) , createArte )
router.put( "/task/:id", upload.single('imagen'), requiredAuth, updateArte )
router.delete( "/task/:id", requiredAuth, deleteArte )

export default router