const { pool } = require('../config/database');

class Expense {
  static async create(team_id, user_id, amount, description, category) {
    const result = await pool.query(
      'INSERT INTO expenses (team_id, user_id, amount, description, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [team_id, user_id, amount, description, category]
    );
    return result.rows[0];
  }

  static async findByTeam(team_id) {
    const result = await pool.query(
      'SELECT * FROM expenses WHERE team_id = $1 ORDER BY created_at DESC',
      [team_id]
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, amount, description, category) {
    const result = await pool.query(
      'UPDATE expenses SET amount = $1, description = $2, category = $3 WHERE id = $4 RETURNING *',
      [amount, description, category, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
  }
}

module.exports = Expense;