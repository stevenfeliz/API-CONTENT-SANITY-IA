import { Router } from "express";
import { deleteAllData, eliminarBySlug, eliminarCategoria, insertarData, obtenerAllData } from "../controllers/data.controller";



const router = Router()

router.get("/obtenerAllData",obtenerAllData)
router.post("/insertarData",insertarData)
router.delete("/eliminarData",deleteAllData)
router.delete("/eliminarBySlug",eliminarBySlug)
router.delete("/eliminarCategorias",eliminarCategoria)


export {router}