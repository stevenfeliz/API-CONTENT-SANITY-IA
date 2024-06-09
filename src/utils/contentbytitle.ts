import { openai } from "../config/openai";
import * as cheerio from 'cheerio';
import { youtubeSeach } from "./youtubeSearch";
import { googleImageUrl } from "./googleImageUrl";
import { googleTranslate } from "./googleTranslate";
import { generarExcerpt } from "./generarExcerpt";

interface Props{
    titulo:string
    contentLanguage:string
    imageLanguage:string
}

export const contentByTitleService = async (opts: Props) => {
   
    try {
        const request = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": `eres un seo y redactor profesional en contenido de blogs en paginas webs, tu trabajo sera redactar articulo que resuelvan la intencion de busqueda, y que sea de mucha calidad, el contenido lo vas a generar con sus etiquetas html enfocado al buen seo. yo solo te endicare el titulo, y vas a reestructurar el titulo parafraseado, y cada cosa con tus etiqueta html, todo el contenido damelo en html, tienes un lenght de 600, trata de terminal el articulo.\n\nten estos puntos encuenta: \n1. nunca pongas un heading \"conclusion\",\n2. nunca pongas por ejemplo heading;..\n\n todo en ${opts.contentLanguage}`
                },
                {
                    "role": "user",
                    "content": `dame el contenido en el idioma ${opts.contentLanguage}, titulo: ${opts.titulo}, no olvides el h1`
                }
            ],
            temperature: 1,
            max_tokens: 650,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const contentIa = request.choices[0].message.content

        const $ = cheerio.load(`${contentIa}`);
        const h1 =  $("h1").text()
       
        const youtubeLink = await youtubeSeach(h1)


        const parrafos = $('p')
        const firstParrafo = $('p').first()
        const penultimoParrafo = parrafos.eq(-2);
        penultimoParrafo.after(`<iframe width="560" height="315" src="${youtubeLink.videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`)

        // const texto = await googleTranslate(
        //     {
        //        text:h1,
        //        target:[`${opts.imageLanguage}`]
        //     }
        //  )


        const imagenes = await googleImageUrl(h1)



        parrafos.each((index, element) => {
        
            if (imagenes[index]) {
                $(element).after(`\n <img src="${imagenes[index]}" />`);
            }
        });
 
        return{
            miniatura:youtubeLink.miniatura,
            excerpt:generarExcerpt(firstParrafo.text(),50),
            content:$.html()
        } 
    } catch (error) {
        throw error
    }

}