import express, { Application, NextFunction, Request, Response, urlencoded } from 'express'
import { UsersRoutes } from './routes/users.routes'

const app: Application = express() 

app.use(express.json()) //poder trabalhar com dados json 
app.use(express.urlencoded({ extended: true })) //coloca porcentagem


//chamada pra rota de usuarios
const usersRoutes = new UsersRoutes().getRoutes()

app.use('/users', usersRoutes)


//tratamento do erro que mandou pelo constrollers 
app.use((err: Error, request: Request, response: Response, next: NextFunction) => { 
    if(err instanceof Error) { 
        return response.status(400).json({ 
            message: err.message,
        })
    }
    return response.status(500).json({
        message: 'Internal Server Error'
    })

})


app.listen(3000, () => console.log('server ok'))