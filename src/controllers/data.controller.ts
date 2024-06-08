import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { insertData } from "../services/data/insertData.service"
import { deleteData } from "../services/data/deleteData.service"
import { getAllDataService } from "../services/data/getData.service"
import { deleteCategory } from "../services/data/deleteCategory.service"
import { deleteDataBySlug } from "../services/data/deleteDataBySlug.service"


export const insertarData = async({body}:Request, res: Response) => {

    try {
       
        const response = await insertData(body)

        res.send(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}


export const deleteAllData = async(req:Request, res: Response) => {

    try {
       
        const response = await deleteData()

        res.send(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}



export const eliminarBySlug = async({body}:Request, res: Response) => {

    try {
       
        console.log(body)
        const response = await deleteDataBySlug(body)

        res.send(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}


export const obtenerAllData = async(req:Request, res: Response) => {

    try {
       
        const response = await getAllDataService()

        res.send(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}


export const eliminarCategoria = async(req:Request, res: Response) => {

    try {
       
        const response = await deleteCategory()

        res.send(response)
     
    } catch (error:any) {
        handleHttp(res, error)
    }

}
