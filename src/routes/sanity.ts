import { Router } from "express";
import { 
    deleteAllPostsIA, 
    insertarPostsIA, 
    publicarAllPosts, 
    publicarPostReady } from "../controllers/sanity.controller";
import { publishBySlugController } from "../controllers/contentia.controller";

const router = Router()


router.post("/insertarPostsIA", insertarPostsIA) 
router.post("/insertarPostsIABySlug", ) 
router.get("/publicarPostReady", publicarPostReady)
router.get("/publicarAllPosts", publicarAllPosts) 
router.delete("/deleteAllPostsIA", deleteAllPostsIA) 
router.post("/PublishBySlug",publishBySlugController) 

export {router}