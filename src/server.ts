import express, { Application, NextFunction, Request, Response } from 'express';
import { UsersRoutes } from './routes/users.routes';

const app: Application = express();
app.use(express.json()); //poder trabalhar com dados json
app.use(express.urlencoded({ extended: true })); //coloca percentagem

const usersRoutes = new UsersRoutes().getRoutes(); //chamada pra rota de usuários
app.use('/users', usersRoutes);

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
