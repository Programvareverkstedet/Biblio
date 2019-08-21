'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: 'Book title missing'
  },
  publication_date: {
    type: Date,
    default: Date(0)
  },
  quantity: {
    type: Number,
    default: 1
  },
  amount_loaned: {
    type: Number,
    default: 0
  },
  isbn13: {
    type: String,
    required: 'Book ISBN-13 missing'
  }
});

module.exports = mongoose.model('Book', BookSchema);