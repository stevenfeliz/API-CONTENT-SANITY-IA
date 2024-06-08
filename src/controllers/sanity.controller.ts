import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertarPostsIAService } from "../services/sanity/insertarPostsIA.service"
import { publicarPostReadyService } from "../services/sanity/publicarPostReady.service"
import { publicarAllPostsService } from "../services/sanity/publicarAllPosts.service"
import { deleteAllPostsIAService } from "../services/sanity/deleteAllPostsIA.service"
import { insertarPostBySlug } from "../services/sanity/insertarPostBySlug.service"




export const insertarPostsIA = async({body}:Request, res: Response) => {

    try {
       const response = await insertarPostsIAService(body)

        console.log(response)
       res.json({response})
    } catch (error:any) {
        handleHttp(res, error)
    }

}

export const insertarPostsIABySlug = async({body}:Request, res: Response) => {

    try {
       const response = await insertarPostBySlug(body)

        console.log(response)
       res.json({response})
    } catch (error:any) {
        handleHttp(res, error)
    }

}

export const publicarPostReady = async(req:Request, res: Response) => {
    
    try {
        const response = await publicarPostReadyService()
        res.json({response})

    } catch (error:any) {
        handleHttp(res, error)
    }

}


export const publicarAllPosts = async(req:Request, res: Response) => {
    
    try {
        const response = await publicarAllPostsService()
        res.json({response})
    } catch (error:any) {
        handleHttp(res, error)
    }

}


export const deleteAllPostsIA = async(req:Request, res: Response) => {
    
    try {
        const response = await deleteAllPostsIAService()
        res.json({response})
    } catch (error:any) {
        handleHttp(res, error)
    }

}




