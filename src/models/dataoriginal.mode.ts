import { Schema, model } from "mongoose"
import { Data_Interface } from "../interfaces/data.interface"



const SlugSchema = new Schema({
    _type: { type: String, enum: ['slug'] },
    current: { type: String }
});

const CoverImageSchema = new Schema({
    _type: { type: String, enum: ['image'] },
    alt: { type: String },
    src: { type: String }
});

const CategoriaSchema = new Schema({
    _key: { type: String },
    _ref: { type: String },
    _type: { type: String }
});


const dataSchema = new Schema<Data_Interface>(
    {
        _type: { type: String, enum: ['post-ia','post'],  },
        categoria: [CategoriaSchema],
        content: [],
        coverImage: CoverImageSchema,
        date: { type: String },
        excerpt: { type: String },
        publicado: { type: Boolean },
        slug: SlugSchema,
        title: { type: String }

    },
    {
        _id:true,
        timestamps: true,
        versionKey: false
    }
)

const dataOriginalModel = model("dataOriginal", dataSchema)


export { dataOriginalModel }
