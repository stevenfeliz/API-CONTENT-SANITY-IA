import { Schema, model } from "mongoose"
import { Data_Interface } from "../interfaces/data.interface"
import { DataModel_Interface } from "../interfaces/dataModel.interfaces";

const assetSchema = new Schema({
    _ref: { type: String },
    _type: { type: String }
  });

const SlugSchema = new Schema({
    _type: { type: String, enum: ['slug'] },
    current: { type: String },
    _id:{type: String}
});

const CoverImageSchema = new Schema({
    _type: { type: String, enum: ['image'] },
    alt: { type: String },
    src: { type: String },
    asset: { type: assetSchema }
});

const CategoriaSchema = new Schema({
    _key: { type: String },
    _ref: { type: String },
    _type: { type: String }
});


const dataSchema = new Schema<Data_Interface>(
    {
        step: {type:String},
        _type: { type: String, enum: ['post-ia','post'],  },
        categoria: [CategoriaSchema],
        content: { type: Schema.Types.Mixed },
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

const dataModel = model("data", dataSchema)

export { dataModel }