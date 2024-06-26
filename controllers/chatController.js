const { getChatRoom } = require('../models/chatRoomModel');

const getChatHistory = async (req, res) => {
    if(!req.params || !req.params.roomId){
        res.status(404).send('Provide valid roomId!!');
        return;
    }
    const { roomId } = req.params;
    try {
        const chatRoom = await getChatRoom(roomId);
        if (chatRoom) {
            if(chatRoom.messages){
                res.json(chatRoom.messages);
            }else {
                res.status(404).send("Chat history not found");
            }
        } else {
            res.status(404).send('Room not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = { getChatHistory };
