import "dotenv/config"
import express from "express"
import cors from "cors"
import { router } from "../src/routes"
import { dbConnect } from "../src/config/mongo"



const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use(express.text())

app.use(router)



dbConnect().then((res)=>console.log(res))

app.listen(PORT,()=>console.log(`Escuchando en http://localhost:${PORT}`))
