import { Router } from "express";
import { AiTitle, contentController, uploadImgBlocksController } from "../controllers/contentia.controller";




const router = Router()

// TO IA CONTENT GENERATED

router.post("/title",AiTitle)
router.put("/content",contentController)   
router.put("/uploadImages",uploadImgBlocksController) 

export {router}