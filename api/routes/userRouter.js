'use strict';

const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const requirePermission = require('../../utils/requirePermission');

router.route('/')
  .get(user.list_all)
  .post(requirePermission("add_users"), user.create);

router.route('/:userId')
  .get(user.get)
  .put(requirePermission("update_users"), user.update)
  .delete(requirePermission("delete_users"), user.delete);

module.exports = router;