// To establish connection to MongoDB database using Mongoose

// const { config } = require('dotenv');

// For the interaction with MongoDB using mongoose library
const mongoose = require('mongoose');


// Function responsible for connectiong to the database
const db = async () => {
    try {
        mongoose.set('strictQuery', false)  // Disabling strict mode for queries (Strict mode emits errors for any undefined properties in schema)
        await mongoose.connect(process.env.MONGO_URL)   // Connecting to the MongoDB using MONGO_URL
        console.log('Database Connected')
    } catch (error) {
        console.log('Database Connection Error');
    }
}


// Exporting db function, making it available for use in other parts when file is imported
module.exports = {db}
