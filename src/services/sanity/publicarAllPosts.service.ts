import { client } from "../../config/sanity"
import { Post_Interface } from "../../interfaces/post.interfaces"


export const publicarAllPostsService = async() => {
    const resultados = [];

    try {
        const postsReady:Post_Interface[] = await client.fetch('*[_type == "post-ia"]')

        const postsModified:Post_Interface[] = postsReady.map(object=>{
                
            const modifiedObject = { ...object };
            modifiedObject._type = "post";
            delete modifiedObject._id;
            delete modifiedObject.publicado;
            
            return modifiedObject;
        });
       
    
        for (let i = 0; i < postsModified.length; i++) {
    
            const id = postsReady[i]._id || ""
            await client.create(postsModified[i])
            const deleteArticle = await client.delete(id)
     
            resultados.push(deleteArticle);
        }
        if(postsReady.length < 1){
            return "No hay publicaciones Ready para subir"
        }
        return resultados
        
    } catch (error) {
        throw error
    }
  
}