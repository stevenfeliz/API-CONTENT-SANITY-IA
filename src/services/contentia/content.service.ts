import { Data_Interface } from "../../interfaces/data.interface"
import { dataModel } from "../../models/data.model"
import { contentByTitleService } from "../../utils/contentbytitle"
import { GenerateBlocks } from "../../utils/generateBlocks"

interface Props{
    slugName:string
}

export const contentService = async ({slugName}:Props) => {

    const data = await dataModel.findOne({'slug.current':slugName})

    if(data?.title){

        const content = await contentByTitleService({titulo:data.title,contentLanguage:"espanol",imageLanguage:"es"})
        const blocksPortabletext = await GenerateBlocks(content.content)
        const updatedPost = {
            ...data.toObject(),
            step:'2',
            content:blocksPortabletext.blocks,
            excerpt:`${content.excerpt}`,
            coverImage:{
                type:"image",
                tipo:"imagen",
                alt:"prueba",
                src:`${content.miniatura}`
            }
            
        };
        const updatedDocument = await dataModel.findOneAndUpdate({'slug.current':slugName},updatedPost,{ new:true })
  
        return updatedDocument
    }

}