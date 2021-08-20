const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    message: {
      type: String,
      requried: true,
    },
    sender: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
);

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
