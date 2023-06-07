import { NextFunction, Request, Response } from 'express';
import { UsersServices } from '../services/usersServices';

class UsersController {
  private usersServices: UsersServices;

  constructor() {
    this.usersServices = new UsersServices();
  }
  index() {
    // busca todos
  }
  show() {
    // somente um
  }
  async store(request: Request, response: Response, next: NextFunction) {
    //criar
    const { name, email, password } = request.body;

    try {
      //captura e passa pra frente
      const result = await this.usersServices.create({ name, email, password }); // faz a chamada p. service

      return response.status(201).json(result);
    } catch (error) {
      next(error); //não é resp. por mostrar erro
    }
  }
  async auth(request: Request, response: Response, next: NextFunction) {
    //autenticação
    const { email, password } = request.body;

    try {
      const result = await this.usersServices.auth(email, password);
      return response.json(result);
    } catch (error) {
      next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    const { name, oldPassword, newPassword, avatar_url } = request.body;
    const { user_id } = request;
    console.log(request.file);

    try {
      const result = await this.usersServices.update({
        name,
        oldPassword,
        newPassword,
        avatar_url: request.file,
        user_id,
      });

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };

//chama o serviço
