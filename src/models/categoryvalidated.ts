import { Schema, model } from "mongoose"



interface categoriadata {
    name:string
    _key: string,
    _ref: string,
    _type: string
}
const categoryvalidatedModel = new Schema<categoriadata>(
    {
       name:{type:String},
       _key:{type:String},
       _ref:{type:String},
       _type:{type:String},

    },
    {
        timestamps: true,
        versionKey: false
    }
)

const categoryValidated = model("categoryValidated", categoryvalidatedModel)

export {categoryValidated}