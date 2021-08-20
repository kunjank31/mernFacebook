const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    memeber: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Conversation = new mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
