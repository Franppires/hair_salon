import { prisma } from "../database/prima";
import { ICreate } from "../interfaces/usersInterface";


class UsersRepository { 
    async create( { name, email, password }: ICreate) { 
        const result = await prisma.users.create({ 
            data: {
                name, 
                email, 
                password,
            }
        })
        return result
    }

    async findUserByEmail(email: string) { 
        const result = await prisma.users.findUnique({
            where: {
                email,
            }
        })
        return result
    }
}

export { UsersRepository }

// repositorio faz a criação do usuário no banco de dados 