// Initializing express router
const router = require('express').Router()


// Defining GET route for the root url
router.get('/', (req, res) => {
    res.send('Hello there')
})


// Exporting 'router' instance
module.exports = router
