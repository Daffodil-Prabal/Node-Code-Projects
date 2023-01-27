const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const connectDb = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/errorHandler')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

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
