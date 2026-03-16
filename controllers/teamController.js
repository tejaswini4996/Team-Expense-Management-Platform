const Team = require('../models/Team');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const team = await Team.create(name, req.user.id);
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { team_id, user_id } = req.body;
    const member = await Team.addMember(team_id, user_id);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const { team_id } = req.params;
    const members = await Team.getMembers(team_id);
    res.json(members);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};