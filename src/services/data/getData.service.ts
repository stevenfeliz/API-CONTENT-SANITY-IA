import { dataModel } from "../../models/data.model"


export const getAllDataService = async() => {
    const datos = await dataModel.find({},{ 
        'categoria._id': 0 ,
        'slug._id':0,
        'coverImage._id':0,
        'createdAt':0,
        'updatedAt':0,
        '_id':0
    }).lean().exec()
    return datos
}