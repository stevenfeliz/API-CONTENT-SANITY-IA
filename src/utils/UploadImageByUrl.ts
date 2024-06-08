import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../config/sanity';

interface imageId{
    _id:string
}

export const UploadImageByUrl = async (url: string):Promise<imageId> => {

    const pathImage = path.resolve(__dirname, `../assets/${uuidv4()}.jpg`);
    
 
        try {
           
            const respuesta = await axios({
                url: url,
                method: 'GET',
                responseType: 'stream'
            });

            const escrituraStream = fs.createWriteStream(pathImage);

            respuesta.data.pipe(escrituraStream);

            return new Promise((resolve, reject) => {
                escrituraStream.on('finish', async()=>{

                    try {
                        const upImageSanity = await client.assets.upload("image",fs.createReadStream(pathImage))
                    
                      
                        fs.unlinkSync(pathImage)
                        resolve({"_id":upImageSanity._id})
                    } catch (error) {
                        fs.unlinkSync(pathImage)
                        throw error
                    }
                  
                });
                escrituraStream.on('error', reject);
              });
           
        } catch (error) {
            throw error;
        }
   
}