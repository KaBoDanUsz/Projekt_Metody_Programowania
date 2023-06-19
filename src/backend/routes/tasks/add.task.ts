import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body, validationResult } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { addTask } from '../../services/task.service'
import { checkValidationResult } from '../../utils/validation.utils'

export default {
    method: 'post',
    path: '/api/task/add',
    validators: [
        authorize,
        body('title').not().isEmpty().isString(),
        body('description').not().isEmpty().isString(),
        body('deadLineDate').not().isEmpty().isISO8601(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => await addTask(req.body),
        }),
} as TRoute
