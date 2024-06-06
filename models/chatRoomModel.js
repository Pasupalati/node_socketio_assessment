const { getDB } = require('../config/db');

const getChatRoom = async (roomId) => {
    const db = getDB();
    return await db.collection('chatrooms').findOne({ roomId });
};

const addMessageToRoom = async (roomId, message) => {
    const db = getDB();
    return await db.collection('chatrooms').updateOne(
        { roomId },
        { $push: { messages: message } },
        { upsert: true }
    );
};

module.exports = { getChatRoom, addMessageToRoom };
