import { dataModel } from "../../models/data.model"

export const deleteDataBySlug = async(slug:string) => {
    const dato = await dataModel.deleteOne({ 'slug.current': slug })
    return dato
}
