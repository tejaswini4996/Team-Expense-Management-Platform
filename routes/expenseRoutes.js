const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { limiter } = require('../middleware/rateLimiter');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/', authMiddleware, limiter, expenseController.create);
router.get('/:team_id', authMiddleware, expenseController.getByTeam);
router.put('/:id', authMiddleware, limiter, expenseController.update);
router.delete('/:id', authMiddleware, limiter, expenseController.delete);

module.exports = router;