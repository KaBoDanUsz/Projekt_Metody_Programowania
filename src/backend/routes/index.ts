import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'
import addTask from './tasks/add.task'
import markTask from './tasks/mark.task'
import deleteTask from './tasks/delete.task'
import customMark from './tasks/customMark.task'
import markAsComplete from './tasks/complete.task'
import getAllTasks from './taskPanel/getAllTask.panel'
import getIncompleteTasks from './taskPanel/getIncomplete.panel'
import getTasksBetweenDates from './taskPanel/taskBetweenDates.panel'

const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const apiRoutes = [
    getStatus,
    postUser,
    loginUser,
    addTask,
    markTask,
    deleteTask,
    customMark,
    markAsComplete,
    getAllTasks,
    getIncompleteTasks,
    getTasksBetweenDates,
]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)
export default router
