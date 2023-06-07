import { UsersRepository } from "../repositories/usersRepository"
import { ICreate, IUpdate } from '../interfaces/usersInterface';
import { compare, hash } from "bcrypt";
import { s3 } from "../config/aws";
import { v4 as uuid } from 'uuid'
import { sign } from "jsonwebtoken";

// parecido com users controllers 
class UsersServices { 
    private usersRepository: UsersRepository

    constructor() { 
        this.usersRepository = new UsersRepository
    }

    // criar o usuário e fazer as validações 
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

    async update({ name, oldPassword, newPassword, avatar_url, user_id }: IUpdate) { 
        let password 
        if(oldPassword && newPassword ) { 
            const findUserById = await this.usersRepository.findUserById(user_id)
            if(!findUserById) { 
                throw new Error('User not found')
            }
            const passwordMatch = compare(oldPassword, findUserById.password)
            if(!passwordMatch) { 
                throw new Error('Password invalid')
            }
            password = await hash(password, 10)
            await this.usersRepository.updatePassword(newPassword, user_id)
        }
        if(avatar_url) { 
            const uploadImage = avatar_url?.buffer

            const uploadS3 = await s3
            .upload({
                Bucket: 'semana-heroi', //nome 
                Key: `${uuid()}-${avatar_url?.originalname}`, //nome original
                // ACL: 'public-read', // ler de forma publica 
                Body: uploadImage, // constante criada
            })
            .promise()

            await this.usersRepository.update(name, user_id, uploadS3.Location)
        }
        return { 
            message: 'User updated successfully'
        }
    }

    async auth( email: string, password: string ) { 
        const findUser = await this.usersRepository.findUserByEmail(email) // busca email
        if(!findUser) { 
            throw new Error('User or password invalid')
        }

        const passwordMatch = compare(password, findUser.password) // compara senhas 
        if(!passwordMatch) { 
            throw new Error('User or password invalid')
        }

        let secretKey:string | undefined = process.env.ACCESS_KEY_TOKEN // senha fica no arq. env
        if(!secretKey) { 
            throw new Error('There is no token key')
        }

        const token = sign({email}, secretKey, {  // token de acess por tempo
            subject: findUser.id,
            expiresIn: 60 * 15,
        })

        return { 
            token,
            user: {
                name: findUser.name, 
                email: findUser.email,
            },
        }
    }
}

export { UsersServices }

//serviço chama repositorio 