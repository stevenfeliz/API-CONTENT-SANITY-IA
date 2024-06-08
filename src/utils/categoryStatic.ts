import {Data_Interface} from "../interfaces/data.interface";
import { dataModel } from "../models/data.model"

interface Props{
    CategoryName:string
}


export const categoryStatic = async ({CategoryName}:Props) => {

    try {
        const data:Data_Interface[] = await dataModel.find({}).lean().exec()

        const nuevaData = await Promise.all(data.map(async (post) => {
     
            let ultimoTitulo = post.title

            const updatedPost = {
                ...post,
                categoria:[
                    {
                        _key: "",
                        _ref: CategoryName,
                        _type: ""
                    }
                ],
              

            };
            await dataModel.findByIdAndUpdate(post._id, updatedPost, { new: true });

            return updatedPost;

        }))

        return nuevaData

    } catch (error) {
        throw error
    }

}