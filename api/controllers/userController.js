'use strict';

const mongoose = require('mongoose'),
  User = mongoose.model('User'),
  bcrypt = require('bcrypt');
const saltRounds = 10; // TODO make this configurable.

exports.list_all = function(req, res) {
  User.find({}, function(err, users) {
    if (err) res.status(400).send(err);
    else res.json(users);
  });
};

exports.create = function(req, res) {
  User.findOne({
    "username": req.body.username
  }, function(err, user) {
    if (err) res.status(400).send(err);
    else if (user) res.status(400).send("User with that username already exists.");
    else { // user doesn't exist, allow creation of new one
      const user = new User(req.body);
      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) res.status(500).send(err);
        else {
          user.password = hash;
          user.save(function(err, user) {
            if (err) res.status(400).send(err);
            else res.json(user);
          });
        }
      });
    }
  });
};

exports.get = function(req, res) {
  User.findById(req.params.userId, function(error, user) {
    if (error) res.status(400).send(error);
    else res.json(user);
  });
};

exports.update = function(req, res) {
  function updateUser(newUser) {
    User.findOneAndUpdate({
      _id: req.params.userId
    }, req.body, {
      new: true,
      useFindAndModify: false
    }, function(error, user) {
      if (error) res.status(400).send(error);
      res.json(user);
    });
  }

  if (req.body.password) {
    req.body.password = bcrypt.hash(req.body.password, saltRounds).then(hash => {
      req.body.password = hash;
      updateUser(req.body);
    });
  } else {
    updateUser(req.body);
  }
};

exports.delete = function(req, res) {
  User.findById(req.params.userId, function(error, user) {
    if (error) {
      res.status(400).send(error);
    } else if (user.loaning.length > 0) {
      res.status(403).json({
        message: 'User ' + user.username + ' must return books before deletion.'
      })
    } else {
      User.deleteOne({
        _id: req.params.userId
      }, function(error) {
        if (error) res.status(400).send(error);
        else res.json({
          message: 'User deleted.'
        });
      });
    }
  });
};