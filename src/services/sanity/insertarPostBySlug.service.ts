import { client } from "../../config/sanity"
import { dataModel } from "../../models/data.model"

interface Props{
    slug:string
}


export const insertarPostBySlug = async ({slug}:Props) => {

    try {
        const data = await dataModel.findOne({'slug.current': slug }, {
            'categoria._id': 0,
            'slug._id': 0,
            'coverImage._id': 0,
            'coverImage.asset._id': 0,
            'createdAt': 0,
            'updatedAt': 0,
            '_id': 0,
            'step':0
        })

        if (data) {
        
            await client.create(data)

            const updatedPost = {
                ...data.toObject(),
                step:'4',
            };
    
            const updatedDocument = await dataModel.findOneAndUpdate({'slug.current':slug},updatedPost,{ new:true })
    
            return updatedDocument
      
            
        }

    } catch (error) {
        throw error
    }
}