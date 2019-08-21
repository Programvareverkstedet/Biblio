'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User'),
  Book = mongoose.model('Book');

exports.list_all = function(req, res) {
  res.json(req.user.borrowing);
};

exports.update = function(req, res) {
  Book.findOne({
    _id: req.body.bookId
  }).then((book) => {
    if (!book) {
      res.status(400).send("Book not found.");
    } else {
      // TODO check that the book isn't already borrowed
      req.user.borrowing.push({
        bookId: book._id,
        date: Date.now()
      });
      User.findOneAndUpdate({
        _id: req.user._id
      }, req.user, {
        useFindAndModify: false
      }).exec();
      book.amount_loaned += 1;
      Book.findOneAndUpdate({
        _id: book._id
      }, book, {
        useFindAndModify: false
      }).exec();
      res.json(req.user.borrowing);
    }
  });
};

// TODO
exports.delete = function(req, res) {
  Book.findOne({
    _id: req.body.bookId
  }).then((book) => {
    if (!book) {
      res.status(400).send("Book not found.");
    } else {
      let isBookLoaned = false;
      for (let i = 0; i < req.user.borrowing.length; i++) {
        const b = req.user.borrowing[i];
        console.log(`${typeof b.bookId}, ${typeof book.id}`);
        if (b.bookId.toString() === book.id) {
          console.log(`${b.bookId}, ${book._id}`);
          req.user.borrowing.splice(i, 1);
          isBookLoaned = true;
        }
      }
      if (isBookLoaned) {
        User.findOneAndUpdate({
          _id: req.user._id
        }, req.user, {
          useFindAndModify: false
        }).exec();
        book.amount_loaned -= 1;
        Book.findOneAndUpdate({
          _id: book._id
        }, book, {
          useFindAndModify: false
        }).exec();
        res.json(req.user.borrowing);
      } else {
        res.status(400).send("You haven't loaned this book.")
      }
    }
  });
};