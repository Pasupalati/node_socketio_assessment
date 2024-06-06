const express = require('express');
const { getChatHistory } = require('../controllers/chatController');
const router = express.Router();

router.get('/chat-history/:roomId', getChatHistory);

module.exports = router;
