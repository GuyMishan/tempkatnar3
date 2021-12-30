const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentcontroller");
const checkAuth = require("../middleware/checkauth");
const commentValidator = require("../middleware/schemavalidators/commentvalidator");

router.post(
  "/getComments/",
  checkAuth,
  commentValidator.getComments,
  commentController.getCommentsForPost
);

router.post(
  "/getCommentReplies/",
  checkAuth,
  commentValidator.getCommentReplies,
  commentController.getRepliesForComment
);

router.post(
  "/addComment/",
  checkAuth,
  commentValidator.addComment,
  commentController.addComment
);

router.post(
  "/addCommentReply/",
  checkAuth,
  commentValidator.addCommentReply,
  commentController.addCommentReply
);

router.post(
  "/getCommentLikes",
  checkAuth,
  commentValidator.getCommentLikes,
  commentController.getCommentLikes
);

router.post(
  "/getCommentReplyLikes",
  checkAuth,
  commentValidator.getCommentReplyLikes,
  commentController.getCommentReplyLikes
);

router.post(
  "/likeComment/",
  checkAuth,
  commentValidator.likeComment,
  commentController.likeComment
);

router.post(
  "/likeCommentReply/",
  checkAuth,
  commentValidator.likeCommentReply,
  commentController.likeCommentReply
);

module.exports = router;
