import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { markAsComplete } from '../../services/task.service'
import { RequestForUser } from '../../services/task.service'
export default {
    method: 'post',
    path: '/api/task/Completemark',
    validators: [authorize, body('taskId').not().isEmpty()],

    handler: async (req: RequestForUser, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                const taskId = req.body.taskId
                return await markAsComplete(taskId)
            },
        }),
} as TRoute
