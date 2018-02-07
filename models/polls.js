const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  title: String,
  options: [String]
});

module.exports = mongoose.model('Poll', Poll);
