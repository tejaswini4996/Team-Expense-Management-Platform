const express = require('express');
const dotenv = require('dotenv');
const { initDB } = require('./config/database');
const { initRedis } = require('./config/redis');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const teamRoutes = require('./routes/teamRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Initialize Database and Redis
initDB();
initRedis();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/payments', paymentRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});