// Importing modules
const express = require('express')
const cors = require('cors')
const { db } = require('./db/db');
const {readdirSync} = require('fs')  // Importing 'readdirSync' function from the Node.js 'fs' module to set up the routers
// 'readdirSync' function reads the contents of a directory synchronously and returns an array of filenames


// Initializing express application
const app = express()


// Loading environment variable from .env (to allow use of environment specific values)
require('dotenv').config()


// Assigning value of the environment variable
const PORT = process.env.PORT


// Middlewares
// Configuring express to recognize incoming request with JSON payloads, parsing them and making the data available in 'req.body'
app.use(express.json())

// Integrating cors middleware into the express to handle cross origin request by adding appropriate headers to the response
app.use(cors())


// Testing API (This responds with 'Hello there' when GET request is made to the root end-point '/')
// app.get('/', (req, res)=> {
//     res.send('Hello there')
// })


// Setting up the routes
// Dynamically including route files located in the ./routes directory into an Express application without explicitly listing or importing each route file separately
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/'+route)))


const server = () => {
    db()    // Executes the function imported from 'db'
    
    // Starting the express app and making it listen for incoming HTTP request 
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT)
    })
}

// Calling the server() function
server()
