const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    img: {
      type: String,
      get: (img) => {
        return `${process.env.APP_URL}/upload/${img}`;
      },
    },
    likes: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true, toJSON: { getters: true }, id: false }
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
