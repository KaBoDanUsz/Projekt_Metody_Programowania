import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

import { getTasksBetweenDates } from '../../services/panel.service'
import { checkValidationResult } from '../../utils/validation.utils'
export default {
    method: 'post',
    path: '/api/taskPanel/get_by_date',
    validators: [
        authorize,
        body('startDate').not().isEmpty().isISO8601(),
        body('endDate').not().isEmpty().isISO8601(),
    ],

    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                const startDate = new Date(req.body.startDate)
                const endDate = new Date(req.body.endDate)
                const tasks = await getTasksBetweenDates([startDate, endDate])
                return tasks
            },
        }),
} as TRoute
