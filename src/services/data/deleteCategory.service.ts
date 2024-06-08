import { categoryValidated } from "../../models/categoryvalidated"


export const deleteCategory= async() => {
    const dato = await categoryValidated.deleteMany({})
    return dato
}