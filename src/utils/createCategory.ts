import { client } from "../config/sanity"
import { categoriadata } from "../interfaces/category.interface"
import { categoryValidated } from "../models/categoryvalidated"
import { v4 as uuidv4 } from 'uuid';

interface categorySanityResponse {
    _id: string
    name: string
}


export const createCategory = async (categorias: categoriadata[]) => {

    let data: categoriadata[] = []


    try {
        for (const categoria of categorias) {
          
            const normalizedName = categoria._ref.toLowerCase();
            const slug = normalizedName.replace(/\s+/g, '-')
            const category = {
                _type: "reference",
                name: normalizedName,
                slug: {
                    current: slug
                }
            }

            const validated: categorySanityResponse[] = await client.fetch(`*[_type == "categories" && name == "${normalizedName}"]`)


            if (validated.length == 0) {

                const databaseValidate = await categoryValidated.findOne({ name: normalizedName }).lean().exec()

                if (!databaseValidate) {
                    const response = await client.create(category)
                    let info = {name: normalizedName,_key: uuidv4(),_ref: response._id,_type: "reference"}

                    await categoryValidated.create(info)
                        
                    data.push(info)
                } else {
                    data.push({
                        
                        _key: uuidv4(),
                        
                        _ref: databaseValidate!._ref,
                        _type: "reference",
                    })
                }
            } else {
                data.push({
                    _key: uuidv4(),
                    _ref: validated[0]._id,
                    _type: "reference",
                })
            }



        }

        return data
    } catch (error) {
        throw error
    }



}