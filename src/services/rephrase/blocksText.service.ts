import { googleApi } from "../../config/googleApi"
import { Data_Interface } from "../../interfaces/data.interface"
import { dataModel } from "../../models/data.model"


interface Prompts{
    start:string
    end:string
}


export const blocksTextService = async (prompts:Prompts[]) => {
    try {
        const datas: Data_Interface[] = await dataModel.find({}).lean().exec()
        const nuevaData: Data_Interface[] = [];

        for(const data of datas ){
            let BlocksContent = []

            for(const contenido of data.content){
                if(contenido.tipo == "parrafo"){
                   
                    let ultimoTexto = contenido.children[0].text
                    for (const prompt of prompts) {
            
                        const promptText = `${prompt.start} "${ultimoTexto}" ${prompt.end}`;
                        const respuesta = await googleApi(promptText);

                        console.log(respuesta)
                        ultimoTexto = respuesta
                    }

                    let newBlock =  {
                        "_key": "2c75ca17-2bdc-454c-8bbb-2bafd8b32b99",
                        "_type": "block",
                        "children": [
                          {
                            "_key": "2c75ca17-2bdc-454c-8bbb-2bafd8b32b990",
                            "_type": "span",
                            "marks": [],
                            "text": ultimoTexto
                          }
                        ],
                        "markDefs": [],
                        "style": "normal",
                        "tipo": "parrafo"
                      }
                    BlocksContent.push(newBlock)
                }else{

                    BlocksContent.push(contenido)
                }
            }

            const updatedBlocks = {
                ...data,
                content: BlocksContent
                 
            };
            nuevaData.push(updatedBlocks)

        }
        return nuevaData
    } catch (error) {
        throw error
    }


}