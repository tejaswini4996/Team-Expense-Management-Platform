const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { limiter } = require('../middleware/rateLimiter');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/', authMiddleware, limiter, paymentController.createPayment);
router.post('/:payment_id/confirm', authMiddleware, limiter, paymentController.confirmPayment);

module.exports = router;