import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/usersServices";
import { s3 } from "../config/aws";
import { v4 as uuid } from 'uuid'

class UsersController { 
    private usersServices: UsersServices

    constructor() { 
        this.usersServices = new UsersServices()
    }
    index() { // busca todos
    }
    show() { // somente um 
    }
    async store( request: Request, response: Response, next: NextFunction  ) { //criar 
        const { name, email, password } = request.body

        try { //captura e passa pra frente
            const result = await this.usersServices.create({ name, email, password }) // faz a chamada p. service 

            return response.status(201).json(result)

        } catch (error) {
            next(error) //não é resp. por mostrar erro
        }
    }
    auth() { //autenticação
    }
    async update( request: Request, response: Response, next: NextFunction  ) { 
        const { name, oldPassword, newPassword, avatar_url } = request.body
        console.log(request.file)
        
        try {
            const avatar_url = request.file?.buffer
            const uploadS3 = await s3.upload({
                Bucket: 'semana-heroi', //nome 
                Key: `${uuid()}-${request.file?.originalname}`, //nome original
                ACL: 'public-read', // ler de forma publica 
                Body: avatar_url, // constante criada
            })
            .promise()

            console.log('url imagem ->', uploadS3.Location)

        } catch (error) {
            next(error) 
        }
    }
}

export { UsersController }

//chama o serviço 