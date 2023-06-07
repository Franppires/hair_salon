import express, { Application, NextFunction, Request, Response } from 'express';
import { UsersRoutes } from './routes/users.routes';
import { SchedulesRoutes } from './routes/schedule.routes';

const app: Application = express();
app.use(express.json()); //poder trabalhar com dados json
app.use(express.urlencoded({ extended: true })); //coloca percentagem

const usersRoutes = new UsersRoutes().getRoutes(); //chamada pra rota de usuários
const schedulesRoutes = new SchedulesRoutes().getRoutes() //chamada para os agendamentos 

app.use('/users', usersRoutes); //rota para usuarios 
app.use('/schedules', schedulesRoutes); //rota par agendamentos  

//tratamento do erro que mandou pelo controllers
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      // quer dizer que se ...  throw new Error('erro')
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      message: 'Internal Server Error',
    });
  }
);

app.listen(3000, () => console.log('server ok'));
