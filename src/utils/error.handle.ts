import { AxiosError } from "axios";
import { Response } from "express";

const handleHttp = (res: Response, error: AxiosError) => {
    console.log(error)
   res.status(500)
    res.send({error})
}

export { handleHttp }