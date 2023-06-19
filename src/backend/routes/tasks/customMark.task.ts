import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { customMark } from '../../services/task.service'
import { RequestForUser } from '../../services/task.service'
export default {
    method: 'post',
    path: '/api/task/customMark',
    validators: [
        authorize,
        body('taskId').not().isEmpty(),
        body('status').not().isEmpty().isString(),
    ],

    handler: async (req: RequestForUser, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                const taskId = req.body.taskId
                const status = req.body.status
                return await customMark([taskId, status])
            },
        }),
} as TRoute
