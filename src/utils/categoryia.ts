import { openai } from "../config/openai";
import {Data_Interface} from "../interfaces/data.interface";
import { dataModel } from "../models/data.model"
import { createCategory } from "./createCategory";



export const categoryia = async () => {

    try {
        const data:Data_Interface[] = await dataModel.find({}).lean().exec()

        const nuevaData = await Promise.all(data.map(async (post) => {

            const categorias: any = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": "eres un editor profesional en redaccion, y parafraseando texto, tu trabajo sera darme un string categoria que consideres que va con el titulo siguiente, maximo 1, siempre tiene que ser un string."
                    },
                    {
                        "role": "user",
                        "content": `titulo : ${post.title}`
                    }
                ],
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            const aiCategorys = await categorias.choices[0].message.content


     
            
           const aiCategorysCleaned = aiCategorys.trim().replace(/^["']+|["']+$/g, '');
            console.log(aiCategorysCleaned)
         const categoria = await createCategory([{
                _key: "",
                _ref:aiCategorysCleaned || "analizar",
                _type: ""
            }])

            let ultimoTitulo = post.title

            const updatedPost = {
                ...post,
                categoria:categoria,
              

            };

            console.log(updatedPost)
            await dataModel.findByIdAndUpdate(post._id, updatedPost, { new: true });

            return updatedPost;

        }))

        return nuevaData

    } catch (error) {
        throw error
    }

}