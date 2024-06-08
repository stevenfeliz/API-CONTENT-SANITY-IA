import { client } from "../../config/sanity"
import { Post_Interface } from "../../interfaces/post.interfaces"


export const deleteAllPostsIAService = async () => {
    const resultados = []
    try {
        const postsReady:Post_Interface[] = await client.fetch('*[_type == "post-ia"]')

        for (let i = 0; i < postsReady.length; i++) {
    
            const id = postsReady[i]._id || ""
            const deleteArticle = await client.delete(id)
     
            resultados.push(deleteArticle);
        }
        if(postsReady.length < 1){
            return "No hay publicaciones para borrar"
        }
        return resultados
    } catch (error) {
        throw error
    }
    
}