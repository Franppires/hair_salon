import { prisma } from "../database/prisma";
import { ICreate } from "../interfaces/usersInterface";

// mesma estrutura básica de users controllers
class UsersRepository { 
    async create({ name, email, password }: ICreate) { 
        const result = await prisma.users.create({ // instância database para pegar a tabela
            data: {
                name, 
                email, 
                password,
            }
        })
        return result
    }

    async findUserByEmail(email: string) { 
        const result = await prisma.users.findUnique({ // verificar se existe o usuario 
            where: {
                email,
            }
        })
        return result
    }

    async findUserById(id: string) { 
        const result = await prisma.users.findUnique({ 
            where: {
                id,
            }
        })
        return result
    }

    async update(name: string, avatar_url: string, user_id:string ) {
        const result = await prisma.users.update({
            where: {
                id: user_id
            }, 
            data: {
                name,
                avatar_url,
            }
        })
        return result
    }
    async updatePassword(newPassword: string, user_id:string ) {
        const result = await prisma.users.update({
            where: {
                id: user_id
            }, 
            data: {
                password: newPassword,
            }
        })
        return result
    }
}

export { UsersRepository }

// repositorio faz a criação do usuário no banco de dados 