// Importing mongoose library
const mongoose = require('mongoose')


// Defining Income Schema
const IncomeSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
        trim: true, // Automatically trims whitespace from the beginning and end of the title string
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default: "income"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
},{timestamps: true}    // To automatically manage createdAt and updatedAt fields in the document
)


// Exporting the 'IncomeSchema' as 'Income'
module.exports = mongoose.model('Income', IncomeSchema)
