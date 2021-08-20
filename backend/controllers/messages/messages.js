const Message = require("../../models/message");
const messages = {
  async newMessage(req, res, next) {
    const newMessage = new Message(req.body);
    try {
      const result = await newMessage.save();
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  },
  async messageConversationId(req, res, next) {
    try {
      const result = await Message.find({
        conversationId: req.params.conversationId,
      });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = messages;
