const User = require("../../models/auth_Models");
const Post = require("../../models/post_Models");

const post_Controller = {
  async createPost(req, res, next) {
    const { desc } = req.body;
    try {
      const post = new Post({
        desc,
        ...(req.file && { img: req.file.filename }),
        userId: req.user.user._id,
      });
      const result = await post.save();

      return res.status(201).json({ msg: "Post Created", result });
    } catch (error) {
      return next(error);
    }
  },
  async updatePost(req, res, next) {
    try {
      const postUpdate = await Post.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      if (!postUpdate) {
        return res.status(204).json({ msg: "Post not updated" });
      }
      return res.status(202).json({ msg: "Post Updated", postUpdate });
    } catch (error) {
      return next(error);
    }
  },
  async deletePost(req, res, next) {
    try {
      const post = await Post.findByIdAndDelete({ _id: req.params.id });
      if (!post) {
        return res.status(400).json({ msg: "Nothing to find" });
      }
      return res.status(201).json({ msg: "Your Post Deleted" });
    } catch (error) {
      return next(error);
    }
  },
  // Like and Unlike Post
  async likePost(req, res, next) {
    // const { _id } = req.user.user;
    const { _id } = req.body;
    try {
      const post = await Post.findById({ _id: req.params.id });
      if (post.likes.includes(_id)) {
        await post.updateOne({ $pull: { likes: _id } });
        return res.status(403).json({ msg: "You Unliked" });
      } else {
        await post.updateOne({ $push: { likes: _id } });
        return res.status(201).json({ msg: "You liked" });
      }
    } catch (error) {
      return next(error);
    }
  },
  // TimeLine
  async timeline(req, res, next) {
    try {
      const currentUser = await User.findById({ _id: req.params.userId });
      const userPost = await Post.find({ userId: currentUser._id }).populate(
        "userId",
        "username name avatar"
      ).sort({createdAt:-1});
      const friendPost = await Promise.all(
        currentUser.following.map(async (friendsId) => {
          try {
            return await Post.find({ userId: friendsId })
            .sort({createdAt:-1})
              .populate("userId", "username name avatar");
          } catch (error) {
            return next(error);
          }
        })
      );
      return res.status(200).json(userPost.concat(...friendPost));
    } catch (error) {
      return next(error);
    }
  },
  async userPostUsername(req, res, next) {
    try {
      const user = await User.findOne({ username: req.params.username });
      const post = await Post.find({ userId: user._id }).populate("userId").sort({createdAt:-1});
      return res.status(200).json(post);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = post_Controller;
