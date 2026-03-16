const Expense = require('../models/Expense');

exports.create = async (req, res) => {
  try {
    const { team_id, amount, description, category } = req.body;
    const expense = await Expense.create(team_id, req.user.id, amount, description, category);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getByTeam = async (req, res) => {
  try {
    const { team_id } = req.params;
    const expenses = await Expense.findByTeam(team_id);
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;
    const expense = await Expense.update(id, amount, description, category);
    res.json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.delete(id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};