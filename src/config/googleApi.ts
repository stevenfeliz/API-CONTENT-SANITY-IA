import {GoogleGenerativeAI} from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API || "");


export const googleApi = async(prompt:string) =>{
    const modelGoogle = genAI.getGenerativeModel({model:"gemini-pro"})
    

    const result = await modelGoogle.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    

    return text

}
