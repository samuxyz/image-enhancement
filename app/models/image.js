"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//image schema definition
let ImageSchema = new Schema(
  {
    caption: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    urlEnhanced: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }  
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ImageSchema.pre('save', next => {
   let now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the ImageSchema for use elsewhere.
module.exports = mongoose.model('image', ImageSchema);