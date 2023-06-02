import express, { Application, urlencoded } from 'express'
import { UsersRoutes } from './routes/users.routes'

const app: Application = express() 

app.use(express.json()) //poder trabalhar com dados json 
app.use(express.urlencoded({ extended: true })) //coloca porcentagem


//chamada pra rota de usuarios
const usersRoutes = new UsersRoutes().getRoutes()

app.use('/users', usersRoutes)


app.listen(3000, () => console.log('server ok'))