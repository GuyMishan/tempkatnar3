const express = require("express");
const router = express.Router();
const postController = require("../controllers/postcontroller");
const userController = require("../controllers/usercontroller");
const checkAuth = require("../middleware/checkauth");
const postValidator = require("../middleware/schemavalidators/postvalidator");

router.post(
  "/getPosts",
  checkAuth,
  postValidator.getPosts,
  userController.getFollowings,
  postController.getPosts
);

router.post(
  "/getPostsByHashtag",
  checkAuth,
  postValidator.getPostsByHashtag,
  postController.getPostsByHashtag
);

router.post(
  "/getPostLikes",
  checkAuth,
  postValidator.getPostLikes,
  postController.getPostLikes
);

router.post(
  "/getPostsByLocation",
  checkAuth,
  postValidator.getPostsByLocation,
  postController.getPostsByLocation
);

router.post(
  "/addPost",
  checkAuth,
  postController.upload,
  //postValidator.createPost,
  postController.createPost
);

router.post(
  "/getPost",
  checkAuth,
  postValidator.getPost,
  postController.getPost
);

router.post(
  "/likePost/",
  checkAuth,
  postValidator.likePost,
  postController.likePost
);

router.post(
  "/delete/",
  checkAuth,
  postValidator.deletePost,
  postController.deletePost
);

router.post(
  "/downloadPostPicture",
  postController.downloadPostPicture
);

module.exports = router;
