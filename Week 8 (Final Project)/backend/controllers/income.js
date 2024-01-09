const IncomeSchema = require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
    // console.log(req.body);
    const {title, amount, category, description, date} = req.body
    const Income = IncomeSchema
}