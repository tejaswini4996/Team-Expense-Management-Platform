const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const { to_user_id, amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { from_user_id: req.user.id, to_user_id }
    });

    const payment = await Payment.create(req.user.id, to_user_id, amount, paymentIntent.id);
    res.status(201).json({ payment, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const payment = await Payment.updateStatus(payment_id, 'completed');
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};