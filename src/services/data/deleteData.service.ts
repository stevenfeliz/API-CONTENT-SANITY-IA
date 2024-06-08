import { dataModel } from "../../models/data.model"

export const deleteData= async() => {
    const dato = await dataModel.deleteMany({})
    return dato
}