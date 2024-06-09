import { Data_Interface } from "../../interfaces/data.interface";
import { dataModel } from "../../models/data.model";
import { UploadImageByUrl } from "../../utils/UploadImageByUrl";

interface Props{
    slugName:string
}

export const uploadImgBlocksService = async ({slugName}:Props) => {

    try {


        const data = await dataModel.findOne({'slug.current':slugName})

        if(data && data.content){

            let BlocksContent = []
            let coverImageid = ""
        
            for (const contenido of data.content) {

                if (contenido._type === "image") {
    
                    const idImageSanity = await UploadImageByUrl(contenido.asset._ref)
    
                    let newBlock = {
                        "cambiado": true,
                        "_type": "image",
                        "asset": {
                            "_ref": idImageSanity._id,
                            "_type": "reference"
                        },
                        "_key": "5e7ba5d29759"
    
                    }
                    BlocksContent.push(newBlock)
                } else {
    
                    BlocksContent.push(contenido)
                }
            }
    
    
            if (data.coverImage) {
                
                if (data.coverImage.src) {
                    const idImdsageSanity = await UploadImageByUrl(data.coverImage.src)
                    

                    coverImageid = idImdsageSanity._id
                }
            }
            
            const updatedBlocks = {
                ...data.toObject(),
                step:"3",
                coverImage:{
                    "_type":"image",
                    "asset":{
                        "_ref":coverImageid,
                        "_type":"reference"
                    },
                    "alt": "prueba",
                    
    
                },
                content: BlocksContent,
                
            };

            const updatedDocument = await dataModel.findOneAndUpdate({'slug.current':slugName},updatedBlocks,{ new:true })

           
            return updatedDocument
        }

    } catch (error) {
        throw error
    }

}