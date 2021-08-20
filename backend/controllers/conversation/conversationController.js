const Conversation = require("../../models/conversation");

const conversationController = {
  async members(req, res, next) {
    const conversation = new Conversation({
      memeber: [req.body.sender, req.body.receiver],
    });
    try {
      const result = await conversation.save();
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  },
  async userConversation(req, res, next) {
    try {
      const result = await Conversation.find({
        memeber: { $in: [req.params.userId] },
      });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
  async allMemeber(req, res, next) {
    try {
      const result = await Conversation.findOne({
        memeber: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = conversationController;
