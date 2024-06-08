import { categoryService } from "../services/contentia/category.service";
import { contentService } from "../services/contentia/content.service";
import { AiTitleService } from "../services/contentia/title.service";
import { uploadImgBlocksService } from "../services/contentia/uploadImgBlock.service";
import { insertarPostBySlug } from "../services/sanity/insertarPostBySlug.service";
import { handleHttp } from "../utils/error.handle";
import { Response,Request } from "express";



export const AiTitle = async({body}:Request, res: Response) => {

    try {
       
       const request = await AiTitleService(body)

       res.send(request)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}


// export const Aicategory = async(req:Request, res: Response) => {
//     const {body} = req
//     try {
       
//        const request = await categoryService(body)

//        res.send(request)
     
//     } catch (error:any) {
//         handleHttp(res, error)
//     }

// }


export const contentController = async({body}:Request, res: Response) => {

    try {
       
       const request = await contentService(body)

       res.send(request)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}

export const uploadImgBlocksController = async({body}:Request, res: Response) => {

    try {
       
       const request = await uploadImgBlocksService(body)

       res.send(request)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}



export const publishBySlugController = async({body}:Request, res: Response) => {

    try {
       
       const request = await insertarPostBySlug(body)

       res.send(request)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}



