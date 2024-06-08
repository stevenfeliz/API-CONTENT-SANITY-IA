import { Router } from "express";
import { 
    blocksCoverImage, 
    blocksText, 
    categories, 
    titleSlugDate } from "../controllers/rephrase.controller";



const router = Router()

// TO SCRAPING

router.post("/title-slug-date", titleSlugDate) // done
router.post("/categories", categories)         // done
router.post("/blocks-text", blocksText) 
router.post("/blocks-cover-image", blocksCoverImage) 




export {router}