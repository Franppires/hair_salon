import { NextFunction, Request, Response } from "express";
import { SchedulesService } from "../services/SchedulesService";
import { parseISO } from "date-fns";

class SchedulesController {
  private schedulesService: SchedulesService //modo privado

  constructor() { 
    this.schedulesService = new SchedulesService(); //nova instancia 
  }

  async store(request: Request, response: Response, next: NextFunction) { // método de criação
    const { name, phone, date } = request.body // cria o agendamento as inf. vem da requisição

    try { // se der erro passa pra frente 
      const result = await this.schedulesService.create({ name, phone, date }) // para criar agendamento
      return response.status(201).json(result)

    } catch (error) {
      next(error) // manda pra frente captura e manda 
    }
  }
  async index(request: Request, response: Response, next: NextFunction) { // buscar todos
    const { date } = request.query //buscar as datas do dia 
    const parseDate = date ? parseISO(date.toString()) : new Date()

    try {
      const result = await this.schedulesService.index(parseDate)
      return response.status(200).json(result)

    } catch (error) {
      next(error)
    }
  }
  update(request: Request, response: Response, next: NextFunction) { // atualizar 

  }
  delete(request: Request, response: Response, next: NextFunction) {  // excluir 

  }
} 

export { SchedulesController }