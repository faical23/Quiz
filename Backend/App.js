const express = require('express')
const app = express()
const router = require('./Router/User')
app.use(express.json())

/// IMPORT OUR ROUTER 
const UserRouter = require('./Router/User')


/// OUR ROUTERS 
app.use('/api/user', UserRouter)


app.get('/', (req, res) => {
    res.send({
        message:"welcome in my api!"
    })
})
const listener = app.listen(process.env.PORT || 8080, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})