const User = require("../../models/auth_Models");
const schema = require("../../Validator/auth_validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_JWT_KEY, {
    expiresIn: "7d",
  });
};

const auth_Controller = {
  async register(req, res, next) {
    // validation
    const { error } = schema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { name, email, phone, password, username } = req.body;
    try {
      const existsEmail = await User.exists({ email });
      const usernameExits = await User.exists({ username });
      if (existsEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (usernameExits) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const user = new User({
        name,
        username,
        email,
        phone,
        password,
      });
      const result = await user.save();
      const token = generateToken(result);
      return res.status(201).json({ success: "Register Successfull", token });
    } catch (error) {
      return next(error);
    }
  },
  // Login
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        $or: [{ email }, { username: email }],
      });
      if (!user) {
        return res.status(200).json({ error: "Wrong Caredential" });
      }
      const verifyPass = await bcrypt.compare(password, user.password);
      if (verifyPass) {
        const token = generateToken(user);
        return res.status(200).json({ success: "You're logged in", token });
      } else {
        return res.status(400).json({ error: "Wrong Caredential!" });
      }
    } catch (error) {
      return next(error);
    }
  },
  // Delete User
  async deleteUser(req, res, next) {
    const { userId } = req.body;
    try {
      const user = await User.findByIdAndDelete({ _id: userId });
      if (!user) {
        return res.status(400).json({ error: "Nothing to find" });
      }
      return res.status(200).json({ success: "User Account Deleted" });
    } catch (error) {
      return next(error);
    }
  },
  // update User
  async updateUser(req, res, next) {
    const { userId } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(400).json({ error: "User Not Found!" });
      }
      return res.status(200).json({ success: "Update Successfull", user });
    } catch (error) {
      return next(error);
    }
  },
  // Follow user
  async follow(req, res, next) {
    const { _id } = req.user.user;
    if (_id !== req.params.id) {
      try {
        const user = await User.findById({ _id: req.params.id });
        const currentUser = await User.findById({ _id });
        if (!user.followers.includes(_id)) {
          await user.updateOne({ $push: { followers: _id } });
          await currentUser.updateOne({ $push: { following: req.params.id } });
          return res
            .status(200)
            .json({ success: "User has been followed", user });
        }
        return res.status(403).json({ error: "you are already followed" });
      } catch (error) {
        return next(error);
      }
    } else {
      return res.status(403).json({ error: "you cant follow yourself!" });
    }
  },
  // unfollow user
  async unfollow(req, res, next) {
    const { _id } = req.user.user;
    if (_id !== req.params.id) {
      try {
        const user = await User.findById({ _id: req.params.id });
        const currentUser = await User.findById({ _id: _id });
        if (user.followers.includes(_id)) {
          await user.updateOne({ $pull: { followers: _id } });
          await currentUser.updateOne({ $pull: { following: req.params.id } });
          return res
            .status(200)
            .json({ success: "User has been unfollowed", user });
        }
        return res.status(403).json({ error: "you dont unfollow this user" });
      } catch (error) {
        return next(error);
      }
    } else {
      return res.status(403).json({ error: "you cant unfollow yourself!" });
    }
  },
  // Username
  async getSingleUser(req, res, next) {
    const id = req.query.id;
    const username = req.query.username;
    try {
      const user = id
        ? await User.findById(id)
        : await User.findOne({ username });
      const { password, isAdmin, ...info } = user._doc;
      return res.status(200).json(info);
    } catch (error) {
      return next(error);
    }
  },
  // Get Friends
  async getFriends(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ error: "user is not found" });
      }
      const friends = await Promise.all(
        user.following.map((id) => {
          return User.findById(id);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, avatar, name } = friend;
        friendList.push({_id, username, avatar, name});
      });
      return res.status(200).json(friendList);
    } catch (error) {
      return next(error);
    }
  },
  async upload(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        await user.updateOne({ avatar: req.file.filename });
      }
      return res.json({ msg: "Image Updated" });
    } catch (error) {
      return next(error);
    }
  },
  async coverPic(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        await user.updateOne({ coverPic: req.file.filename });
      }
      return res.json({ msg: "Image Updated" });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = auth_Controller;
