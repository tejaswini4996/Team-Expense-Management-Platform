const User = require('../models/User');
const { generateToken } = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.create(email, password, name);
    const token = generateToken({ id: user.id, email: user.email });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await User.verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};