const { Translate } = require('@google-cloud/translate').v2;

interface Props{
    text:string,
    target:string[]
}



export const googleTranslate = async (props:Props) => {

    let traducion = props.text

    const translate = new Translate();
    
   for(let target of props.target){

    let [translations] = await translate.translate(traducion, target);
    traducion = translations
   }


    

    return traducion
}