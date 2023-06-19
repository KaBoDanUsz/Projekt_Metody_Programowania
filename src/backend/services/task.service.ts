import { prisma } from '../database'
import { v4 } from 'uuid'
import { Request as ExpressRequest } from 'express'
export interface RequestForUser extends ExpressRequest {
    user: {
        id: string
    }
}

export type TaskData = {
    id: string
    title: string
    complete: boolean
    description: string
    userId?: string
    deadLineDate: Date
    taskStatus: string
}

export const addTask = async ({
    title,
    complete,
    description,
    deadLineDate,
}: Pick<TaskData, 'title' | 'description' | 'complete' | 'deadLineDate'>) => {
    return await prisma.task.create({
        data: {
            id: v4(),
            title,
            description,
            userId: 'empty',
            complete,
            deadLineDate,
        },
    })
}
export const markTask = async (taskId: string) => {
    return await prisma.task.update({
        where: { id: taskId },
        data: { taskStatus: 'w toku' },
    })
}
export const customMark = async ([taskId, status]: [string, string]) => {
    return await prisma.task.update({
        where: { id: taskId },
        data: { taskStatus: status },
    })
}
export const deleteTask = async (taskId: string) => {
    return await prisma.task.delete({
        where: { id: taskId },
    })
}
export const markAsComplete = async (taskId: string) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
    })

    return await prisma.task.update({
        where: { id: taskId },
        data: { taskStatus: 'ukończono', complete: true },
    })
}
