const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const ratingSchema = new mongoose.Schema({
  //visitor data
user:{type:ObjectId, ref:"User"},
carnum:{type:String},
ratenumber:{type:String},
qualified:{type:String},
egadtypeid:{type:ObjectId, ref:"egadtype"}

});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
