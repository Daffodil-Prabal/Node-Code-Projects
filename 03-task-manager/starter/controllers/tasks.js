const getAllTasks = (req, res) => {
    res.send('All Items')
}

const createTask = (req, res) => {
    console.log(req.body);
    res.send('Create Task')
}
const getSingleTask = (req, res) => {
    res.send('Get Single Task')
}
const updateTask = (req, res) => {
    res.send('Update Task')
}
const deleteTask = (req, res) => {
    res.send('Delete Task')
}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}