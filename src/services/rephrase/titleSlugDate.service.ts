import { googleApi } from "../../config/googleApi"
import { Data_Interface } from "../../interfaces/data.interface"
import { PromptsBasic } from "../../interfaces/prompts.interfaces"
import { dataModel } from "../../models/data.model"
import { generateRandomDate } from "../../utils/generateRandomDate"





export const titleSlugDateService = async (prompts:PromptsBasic[]) => {
    try {
        const data: Data_Interface[] = await dataModel.find({}).lean().exec()
        const nuevaData = await Promise.all(data.map(async (post) => {

            let ultimoTitulo = post.title
            for (const prompt of prompts) {
            
                const promptText = `${prompt.text}: "${ultimoTitulo}"`;
                const respuesta = await googleApi(promptText);
                ultimoTitulo = respuesta
            }

            const updatedPost = {
                ...post,
                title: ultimoTitulo,
                date: generateRandomDate(),
                slug: {
                    _type: "slug",
                    current: ultimoTitulo.replace(/\s+/g, '-')
                }
            };
            await dataModel.findByIdAndUpdate(post._id, updatedPost, { new: true });

            return updatedPost;
      
        }))
        
        return nuevaData
    } catch (error) {
        throw error
    }


}