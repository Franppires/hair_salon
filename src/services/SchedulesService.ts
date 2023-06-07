import { ICreate } from "../interfaces/SchedulesInterface";
import { isBefore, startOfHour } from 'date-fns'
import { SchedulesRepository } from "../repositories/SchedulesRepository { ";

class SchedulesService{ 
  private scheduleRepository: SchedulesRepository

  constructor() { 
    this.scheduleRepository = new SchedulesRepository()
  }
  async create({ name, phone, date}: ICreate) { 

    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)
    if(isBefore(hourStart, new Date())) {
      throw new Error('It is not allowed to schedule old date')
    }
    
    const checkIsAvailable = await this.scheduleRepository.find(hourStart)
    if(checkIsAvailable) {
      throw new Error('Schedule date is not a available') //indisponivel horaro 
    }

    const create = await this.scheduleRepository.create({ //pega todos os dados
      name, 
      phone, 
      date: hourStart
    })

    return create
  }
  // async index()
}

export { SchedulesService }