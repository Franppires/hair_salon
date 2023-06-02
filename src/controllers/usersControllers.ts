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
    store( request: Request, response: Response, next: NextFunction  ) { //criar 
        const { name, email, password } = request.body

        try { //captura e passa pra frente
            const result = this.usersServices.create({ name, email, password })

            return response.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    auth() { //autenticação
    }
}

export { UsersController }

//chama o serviço 