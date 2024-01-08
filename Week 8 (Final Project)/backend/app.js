const express = require('express')
const cors = require('cors')
const { db } = require('./db/db');

const app = express()


require('dotenv').config()

const PORT = process.env.PORT


// Middlewares
app.use(express.json())
app.use(cors())

// Testing API
// app.get('/', (req, res)=> {
//     res.send('Hello there')
// })

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT)
    })
}

server()
