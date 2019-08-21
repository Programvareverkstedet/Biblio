'use strict';

const express = require('express')
const router = express.Router()
const borrow = require('../controllers/borrowController');
const requirePermission = require('../../utils/requirePermission');

router.all(requirePermission("borrow_books"));
router.route('/')
  .get(borrow.list_all)
  .put(borrow.update)
  .delete(borrow.delete);

module.exports = router;