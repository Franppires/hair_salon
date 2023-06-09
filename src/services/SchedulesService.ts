import { ICreate } from "../interfaces/SchedulesInterface";
import { isBefore, startOfHour } from 'date-fns'
import { SchedulesRepository } from "../repositories/SchedulesRepository { ";

class SchedulesService{ 
  private scheduleRepository: SchedulesRepository

  constructor() { 
    this.scheduleRepository = new SchedulesRepository()
  }
  async create({ name, phone, date}: ICreate) { //tipo em um arquivo separado

    const dateFormatted = new Date(date) //formatar data
    const hourStart = startOfHour(dateFormatted) //data formatada
    if(isBefore(hourStart, new Date())) {  // confere data atual
      throw new Error('It is not allowed to schedule old date') 
    }
    
    const checkIsAvailable = await this.scheduleRepository.find(hourStart)
    if(checkIsAvailable) {
      throw new Error('Schedule date is not a available') //indisponível horário 
    }

    const create = await this.scheduleRepository.create({ //pega todos os dados
      name, 
      phone, 
      date: hourStart
    })

    return create
  }
  async index(date: Date){ 
    const result = await this.scheduleRepository.findALL(date)
    
    console.log(result)
    return result
  }
}

export { SchedulesService }