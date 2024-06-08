import { categoryStatic } from "../../utils/categoryStatic"

    interface Props{
        CategoryName:string
    }


export const categoryService = async (body:Props) => {

    try {
        const response = await categoryStatic(body)

        return response

    } catch (error) {
        throw error
    }

}