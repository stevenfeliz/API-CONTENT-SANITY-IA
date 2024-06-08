import { client } from "../../config/sanity"
import { Post_Interface } from "../../interfaces/post.interfaces"


export const insertarPostsIAService = async (posts:Post_Interface[]) => {
    
    const resultados = [];

    try {
        for (let i = 0; i < posts.length; i++) {

            const result = await client.create(posts[i])
            resultados.push(result);
        }

    } catch (error) {
        throw error
    }

    return resultados


}