import { endOfDay, startOfDay } from 'date-fns';
import { prisma } from '../database/prisma';
import { ICreate } from '../interfaces/SchedulesInterface';

class SchedulesRepository {
  async create({ name, phone, date }: ICreate) { //criação do agendamento
    const result = await prisma.schedule.create({
      data: {
        name,
        phone,
        date,
      },
    });
    return result;
  }

  async find(date: Date) { // consulta o primeiro que tem a data igual a informada
    const result = await prisma.schedule.findFirst({
      where: { 
        date 
      },
    });
    return result;
  }

  async findALL(date: Date) {
    const result = await prisma.schedule.findMany({
      where: {
        date: { // busca todos os agendamentos pela data 
          gte: startOfDay(date),
          lt: endOfDay(date),
        },
      },
      orderBy: { // ordenar por crescente 
        date: 'asc',
      },
    });
    return result 
  }
}

export { SchedulesRepository };
