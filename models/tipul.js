const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema


const tipulSchema = new mongoose.Schema({
  //visitor data
user:{type:ObjectId, ref:"User"},

tipuldate:{type: Date,required: true},
cartype:{type: String,required: true},
tipultype:{type:String,required:true},
carnum:{type:String},
number:{type:String},
description:{type:String, maxlength:3000},
egadtypeid:{type:ObjectId, ref:"egadtype"},

status:{type:String, default:'ממתין',required:true},

});

const Tipul = mongoose.model('Tipul', tipulSchema);

module.exports = Tipul;
