import { UsersRepository } from "../repositories/usersRepository"
import { ICreate } from '../interfaces/usersInterface';
import { hash } from "bcrypt";


class UsersServices { 
    private usersRepository: UsersRepository

    constructor() { 
        this.usersRepository = new UsersRepository
    }

    async create({ name, email, password }: ICreate) { 
        const findUser = await this.usersRepository.findUserByEmail(email)

        if(findUser) { 
            throw new Error('User exists')
        }
        
        const hashPassword = await hash(password, 10)

        const create = this.usersRepository.create({ 
            name, 
            email, 
            password: hashPassword,
        })
        return create

    }
}

export { UsersServices }

//serviço chama repositorio 