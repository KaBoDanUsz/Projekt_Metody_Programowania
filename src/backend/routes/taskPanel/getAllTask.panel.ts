import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { getAllTasks } from '../../services/panel.service'

export default {
    method: 'get',
    path: '/api/taskPanel/all',
    validators: [authorize],

    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                return await getAllTasks()
            },
        }),
} as TRoute
