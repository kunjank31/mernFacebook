const auth_Controller = require("../controllers/auth/auth_Controller");
const conversationController = require("../controllers/conversation/conversationController");
const messages = require("../controllers/messages/messages");
const post_Controller = require("../controllers/post/post_Controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const router = require("express").Router();
// Auth
router.post("/auth/register", auth_Controller.register);
router.get("/auth", auth, auth_Controller.deleteUser);
router.patch("/auth/update_profile", auth, auth_Controller.updateUser);
router.post("/auth/login", auth_Controller.login);
router.get("/auth/profile", auth_Controller.getSingleUser);
router.get("/auth/friends/:id", auth_Controller.getFriends);
router.post("/upload/:id", upload, auth_Controller.upload);
router.post("/upload/coverpic/:id", upload, auth_Controller.coverPic);

// Follower and Unfollower
router.put("/auth/:id/follow", auth, auth_Controller.follow);
router.put("/auth/:id/unfollow", auth, auth_Controller.unfollow);

// Post
router.post("/post", [auth, upload], post_Controller.createPost);
router.put("/post/:id/update", auth, post_Controller.updatePost);
router.delete("/post/:id/delete", auth, post_Controller.deletePost);
router.get("/post/timeline/:userId", post_Controller.timeline);
router.get("/profile/:username/post", post_Controller.userPostUsername);

// Like and dislike
router.put("/post/:id/like", post_Controller.likePost);

// Conversation
router.post("/conversation", conversationController.members);
router.get("/conversation/:userId", conversationController.userConversation);
router.get(
  "/conversation/find/:firstUserId/:secondUserId",
  conversationController.allMemeber
);

// Message
router.post("/messages", messages.newMessage);
router.get("/messages/:conversationId", messages.messageConversationId);

module.exports = router;
