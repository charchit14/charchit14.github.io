// Importing modules
const { addIncome } = require('../controllers/income')

// Initializing express router
const router = require('express').Router()


// // Defining GET route for the root url
// router.get('/', (req, res) => {
//     res.send('Hello there')
// })


router.post('/add-income', addIncome)



// Exporting 'router' instance
module.exports = router
