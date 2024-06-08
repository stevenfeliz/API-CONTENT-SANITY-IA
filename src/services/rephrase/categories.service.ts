
import { Data_Interface } from "../../interfaces/data.interface"
import { dataModel } from "../../models/data.model"
import { createCategory } from "../../utils/createCategory"



export const categoriesService = async () => {
    try {
        const data: Data_Interface[] = await dataModel.find({}).lean().exec()

        const nuevaData: Data_Interface[] = [];
   
        for(const post of data) {
            const categoriasUpdate = await createCategory(post.categoria)
    
            const updatedPost = {
                ...post,
                categoria: categoriasUpdate
                 
            };
            delete updatedPost._id;
            nuevaData.push(updatedPost);
    
        }

        await dataModel.deleteMany({})
       const result = await dataModel.create(nuevaData)
        return result
    } catch (error) {
        throw error
    }



}