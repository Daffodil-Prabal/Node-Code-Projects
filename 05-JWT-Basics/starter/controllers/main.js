const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password);

    if (!username || !password) {
        throw new CustomAPIError('Please provide username and password', 400)
    }

    res.send('Fake Login/Register/Signup Route')
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 1000)
    res.status(200).json({ msg: `Hello, Trouble`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = {
    login, dashboard
}