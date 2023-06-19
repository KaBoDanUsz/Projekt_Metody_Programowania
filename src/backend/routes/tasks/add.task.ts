import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { addTask } from '../../services/task.service'

export default {
    method: 'post',
    path: '/api/task/add',
    validators: [
        authorize,
        body('title').not().isEmpty(),
        body('complete').isBoolean(),
        body('description').not().isEmpty(),
        body('userId').not().isEmpty(),
        body('deadLineDate').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => await addTask(req.body),
        }),
} as TRoute
