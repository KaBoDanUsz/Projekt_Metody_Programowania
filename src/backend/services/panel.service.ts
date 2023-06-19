import { prisma } from '../database'

export type Task = {
    id: string
    title: string
    complete: boolean
    description: string
    userId?: string
    deadLineDate: Date
    taskStatus: string
}
export const getAllTasks = async () => {
    return await prisma.task.findMany()
}

export const getIncompleteTasks = async (): Promise<Task[]> => {
    return await prisma.task.findMany({
        where: { complete: false },
    })
}

export const getTasksBetweenDates = async ([startDate, endDate]: [
    Date,
    Date,
]): Promise<Task[]> => {
    return await prisma.task.findMany({
        where: {
            complete: false,
            deadLineDate: {
                gte: startDate,
                lte: endDate,
            },
        },
    })
}
