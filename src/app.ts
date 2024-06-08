import "dotenv/config"
import express from "express"
import cors from "cors"
import {router} from "./routes/index"
import { dbConnect } from "./config/mongo"


const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(express.text())

app.use(router)



dbConnect().then((res)=>console.log(res))

app.listen(PORT,()=>console.log(`Escuchando en http://localhost:${PORT}`))















































// import { Schema } from '@sanity/schema'
// import { htmlToBlocks } from '@sanity/block-tools';
// import { JSDOM } from 'jsdom';


// const convertHtmlToBlocks = async (htmlString:string) => {


//     const defaultSchema = Schema.compile({
//       name: 'default',
//       types: [
//         {
//           type: 'object',
//           name: 'myDocument',
//           fields: [
//             {
//               title: 'Body',
//               name: 'body',
//               type: 'array',
//               of: [
//                 { type: 'block' },
//               ],
//             },
//           ],
//         },
//       ],
//     });
  
//     const blockContentType = defaultSchema.get('myDocument').fields.find((field: any) => field.name === 'body').type;
  
  
  
//     const rules = {
//       rules: [
  
//         {
//           deserialize(el: any, next: any, block: any) {
  
//             if (el.tagName !== "IMG") {
//               return undefined
//             }
//             const src = el.getAttribute('src');
//             const alt = el.getAttribute('alt') || '';
  
//             return block({
//               _type: 'image',
//               asset: {
//                 _type: 'reference',
//                 _ref: 'image-123',
//                 _src: src
//               },
//               caption: alt,
//             })
//           },
//         },
//       ],
//       parseHtml: (html:string) => new JSDOM(html).window.document,
//     }
  
//     const blocks = htmlToBlocks(htmlString, blockContentType, rules)
  
  
  
//     return { blocks };
//   };
  
// const ejecu = convertHtmlToBlocks("<p>hola</p>")

// ejecu.then(res=>console.log(res))

