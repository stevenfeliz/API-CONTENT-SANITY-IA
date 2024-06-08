import { dataModel } from "../../models/data.model"

export const getDataBySlug = async(slug:string) => {
    const dato = await dataModel.findOne({slug})
    return dato
}