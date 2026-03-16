const { pool } = require('../config/database');

class Team {
  static async create(name, owner_id) {
    const result = await pool.query(
      'INSERT INTO teams (name, owner_id) VALUES ($1, $2) RETURNING *',
      [name, owner_id]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM teams WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async addMember(team_id, user_id, role = 'member') {
    const result = await pool.query(
      'INSERT INTO team_members (team_id, user_id, role) VALUES ($1, $2, $3) RETURNING *',
      [team_id, user_id, role]
    );
    return result.rows[0];
  }

  static async getMembers(team_id) {
    const result = await pool.query(
      'SELECT u.* FROM users u JOIN team_members tm ON u.id = tm.user_id WHERE tm.team_id = $1',
      [team_id]
    );
    return result.rows;
  }
}

module.exports = Team;