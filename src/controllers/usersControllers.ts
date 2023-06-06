import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/usersServices";


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
    update( request: Request, response: Response, next: NextFunction  ) { 
        const { name, oldPassword, newPassword, avatar_url } = request.body
        console.log(request.files)
        
        try {
            
        } catch (error) {
            next(error) 
        }
    }
}

export { UsersController }

//chama o serviço 