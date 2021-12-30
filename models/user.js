const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 30,
    trim: true,
    match: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "",
    trim: true,
    maxlength: 250,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 40,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    trim: true,
    minlength: 3,
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  profilePicture: {
    type: String,
    default: "person.png",
  },
  activityStatus: {
    type: String,
    default: "offline",
  },
  activated: {
    type: Boolean,
    default: process.env.ENABLE_SEND_EMAIL === "true" ? false : true,
  },
  postLikes: [ {type:ObjectId,ref:'Post'}],
  commentLikes: [ {type:ObjectId,ref:'CommentLike'}],
  commentReplyLikes: [ {type:ObjectId,ref:'CommentReplyLikes'}],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
