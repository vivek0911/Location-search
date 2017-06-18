const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String },
  password: { type: String },
},
  {
    timestamps: true,
    toObject: { virtuals: true },
  });

module.exports = mongoose.model('User', userSchema);
