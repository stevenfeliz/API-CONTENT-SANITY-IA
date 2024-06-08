import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { titleSlugDateService } from "../services/rephrase/titleSlugDate.service"
import { categoriesService } from "../services/rephrase/categories.service"
import { blocksTextService } from "../services/rephrase/blocksText.service"
import { PromptsBasic, PromptsParrafo } from "../interfaces/prompts.interfaces"




export const titleSlugDate = async({body}:Request, res: Response) => {
    
    const prompts:PromptsBasic[] = body

    try {
       
        const response = await titleSlugDateService(prompts)


        res.json(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}


export const categories = async(req:Request, res: Response) => {

    try {
       
        const response = await categoriesService()

        res.send(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}


export const blocksText = async({body}:Request, res: Response) => {
    const prompts:PromptsParrafo[] = body
    try {
       
        const response = await blocksTextService(prompts)

        res.send(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}


export const blocksCoverImage = async(req:Request, res: Response) => {

    try {
       
        // const response = await deleteDatainits()

        // res.send(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}