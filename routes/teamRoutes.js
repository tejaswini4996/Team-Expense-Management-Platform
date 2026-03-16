const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { limiter } = require('../middleware/rateLimiter');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.post('/', authMiddleware, limiter, teamController.create);
router.post('/member', authMiddleware, limiter, teamController.addMember);
router.get('/:team_id/members', authMiddleware, teamController.getMembers);

module.exports = router;