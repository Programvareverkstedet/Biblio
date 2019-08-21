'use strict';

// Adapted from https://stackoverflow.com/questions/9609325/node-js-express-js-user-permission-security-model
module.exports = function requirePermission(permission) {
  return function(req, res, next) {
    console.log(req.user);
    if (req.user && req.user.permissions[permission]) {
      next();
    } else {
      res.status(403).send(`Permission ${permission} not met.`);
    }
  }
}