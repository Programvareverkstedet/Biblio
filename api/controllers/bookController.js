'use strict';

const mongoose = require('mongoose'),
  Book = mongoose.model('Book');

exports.list_all = function(req, res) {
  Book.find({}, function(error, books) {
    if (error) res.status(400).send(error);
    else res.json(books);
  });
};

exports.create = function(req, res) {
  // TODO authenticate
  const book = new Book(req.body);
  book.save(function(error, book) {
    if (error) res.status(400).send(error);
    else res.json(book);
  });
};

exports.get = function(req, res) {
  Book.findById(req.params.bookId, function(error, book) {
    if (error) res.status(400).send(error);
    else res.json(book);
  });
};

exports.update = function(req, res) {
  Book.findOneAndUpdate({
    _id: req.params.bookId
  }, req.body, {
    new: true
  }, function(error, book) {
    if (error) res.status(400).send(error);
    else res.json(book);
  });
};

exports.delete = function(req, res) {
  Book.remove({
    _id: req.params.bookId
  }, function(error, book) {
    if (error) res.status(400).send(error);
    else res.json({
      message: 'Book ' + book.title + ' deleted'
    });
  });
};