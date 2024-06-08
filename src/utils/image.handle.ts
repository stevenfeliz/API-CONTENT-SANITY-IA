import { htmlToBlocks } from "@sanity/block-tools";
import axios from "axios";


const ImageRulesHandle = async (blocks: any[]) => {
    const updatedBlocks = await Promise.all(blocks.map(async (block) => {
      if (block._type === 'image') {
        try {
          const respuesta = await axios({
            url: `http://localhost:3001/portabletext/imageUpload`,
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain',
            },
            data: block.asset._ref
          });
          
          return {
            ...block,
            asset: {
              ...block.asset,
              _ref: respuesta.data
            }
          };
        } catch (error) {
          console.error('Error al procesar la imagen:', error);
          // Mantener el bloque original si hay un error
          return block;
        }
      } else {
        // Mantener los bloques que no son de tipo imagen sin cambios
        return block;
      }
    }));
  
    console.log(updatedBlocks)
    return updatedBlocks;
  };


const blocksReturn = async(htmlString:string,blockContentType:any,rules:any) =>{
    const blocks =   htmlToBlocks(htmlString, blockContentType, rules);
    console.log(blocks)
    return blocks
}


export {
    ImageRulesHandle,
    blocksReturn
}