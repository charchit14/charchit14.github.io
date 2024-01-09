// Importing modules
const IncomeSchema= require("../models/IncomeModel")


// Handling addition of new entry
exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    // Creating new instance of the 'IncomeSchema' model
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        // Validation Case
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        // Saving an entry if validation case is passed
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}


// Retrieving all income entries 
exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1}) // Sorting in descending (last created is seen first)
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}


// Deleting an income entry
exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
