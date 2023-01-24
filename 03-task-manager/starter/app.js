const express = require('express')
const app = express()
const port = 3000;
const tasks = require('./routes/tasks')
const connectDb = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.json())

app.use('/api/v1/tasks', tasks)
app.get('/hello', (req, res) => {
    res.send('<h1>TASK MANAGER APP</h1>')
})

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }
    catch (error) {
        console.log(error);
    }
}

start()
