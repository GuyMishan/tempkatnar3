const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  }
});

module.exports = mongoose.model('User', UserSchema);
