const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    username: {
      type: String,
      requied: true,
      unique: true,
    },
    email: {
      type: String,
      requied: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      requied: true,
    },
    avatar: {
      type: String,
    },
    coverPic: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
    },
    city: {
      type: String,
    },
    from: {
      type: String,
    },
  },
  { timestamps: true }
);

authSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = new mongoose.model("User", authSchema);

module.exports = User;
