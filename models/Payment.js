const { pool } = require('../config/database');

class Payment {
  static async create(from_user_id, to_user_id, amount, stripe_payment_id) {
    const result = await pool.query(
      'INSERT INTO payments (from_user_id, to_user_id, amount, status, stripe_payment_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [from_user_id, to_user_id, amount, 'pending', stripe_payment_id]
    );
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE payments SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM payments WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByUser(user_id) {
    const result = await pool.query(
      'SELECT * FROM payments WHERE from_user_id = $1 OR to_user_id = $1',
      [user_id]
    );
    return result.rows;
  }
}

module.exports = Payment;