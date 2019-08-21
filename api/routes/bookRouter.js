'use strict';

const express = require('express');
const router = express.Router();
const book = require('../controllers/bookController');
const requirePermission = require('../../utils/requirePermission');

router.route('/')
  .get(book.list_all)
  .post(requirePermission("borrow_books"), book.create);

router.route('/:bookId')
  .get(book.get)
  .put(book.update)
  .delete(book.delete);

module.exports = router;