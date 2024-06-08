import { Data_Interface } from "../../interfaces/data.interface"
import { dataModel } from "../../models/data.model"



export const insertData = async(datos:Data_Interface[]) => {
    const InsertDato = await dataModel.create(datos)
    return InsertDato
}