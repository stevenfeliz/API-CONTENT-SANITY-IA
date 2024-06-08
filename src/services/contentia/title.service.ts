import { openai } from '../../config/openai';
import { createCategory } from '../../utils/createCategory';
import { insertData } from '../data/insertData.service';


interface Props {
    title: string[]
    categoria: string
}

export const AiTitleService = async ({ title, categoria }: Props) => {

    const categoriaPublicada = await createCategory(
        [
            {
                _key: "",
                _ref: categoria,
                _type: "reference"
            }
        ]
    )
    const fecha: Date = new Date();
    const año: number = fecha.getFullYear();
    const mes: number = fecha.getMonth() + 1;
    const dia: number = fecha.getDate();
    const fechaFormateada: string = `${año}-${mes < 10 ? "0" : ""}${mes}-${dia < 10 ? "0" : ""}${dia}`;

    try {

        let datos = []
        for (let i = 0; i < title.length; i++) {

            const request = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": "eres un editor profesional en redaccion, y parafraseando texto, tu trabajo sera estructurar nuevo texto con el texto que te pase, el cual tenga el mismo contexto, pero que sea dicho de otra manera, enfocado al seo, sin comillas ni caracteres especiales"
                    },
                    {
                        "role": "user",
                        "content": `convierteme este titulo: "${title[i]}"`
                    }
                ],
                temperature: 1,
                max_tokens: 650,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            const titleRefactory = request.choices[0].message.content

          
        
            const data = {
                "step": "1",
                "_type": "post-ia",
                "publicado":false,
                "categoria": categoriaPublicada,
                "content": "",
                "coverImage": {
                    "_type": "image",
                    "alt": "",
                    "src": "",
                    "_id": "65d29d66cad0f96be947e71d"
                },
                "date": fechaFormateada,
                "excerpt": "",
                "slug": {
                    "_type": "slug",
                    "current": titleRefactory!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                    "_id": "65d2a47ebd74c2c1299dbfaa"
                },
                "title": titleRefactory!,
                "createdAt": "",
                "updatedAt": ""
            }

            datos.push(data)


        }

        return await insertData(datos)



    } catch (error) {
        throw error
    }

}