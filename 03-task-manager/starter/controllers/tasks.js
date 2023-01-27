const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-errors')

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks, nbHits: tasks.length })
})

const createTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    if (!taskID) {
        return next(createCustomError(`ID is required`, 401))
    }
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with ID : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    if (!taskID) {
        return next(createCustomError(`ID is required`, 401))
    }
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(`No task with ID : ${taskID}`, 404))
    }
    res.status(200).json({ id: taskID, data: task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    if (!taskID) {
        return next(createCustomError(`ID is required`, 401))
    }
    const task = await Task.findByIdAndDelete({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with ID : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}