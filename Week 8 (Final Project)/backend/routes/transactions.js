// Importing modules
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// Initializing express router
const router = require('express').Router()


// Defining route paths
router.post('/add-income', addIncome)
.get('/get-incomes', getIncomes)
.delete('/delete-income/:id', deleteIncome)
.post('/add-expense', addExpense)
.get('/get-expenses', getExpense)
.delete('/delete-expense/:id', deleteExpense)


// Exporting 'router' instance
module.exports = router
