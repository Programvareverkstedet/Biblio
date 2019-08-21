const express = require('express'),
  router = express.Router(),
  app = express(),
  port = process.env.PORT || 3000,
  Book = require('./api/models/bookModel'),
  User = require('./api/models/userModel'),
  baseRouter = require('./api/routes/baseRouter'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/ils', {
  useNewUrlParser: true,
  user: "ils_operator",
  pass: process.argv[2],
});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Authentication. Currently uses basic access, which sucks, but it should still be secure.
router.use(function(req, res, next) {
  const header = req.header('Authorization');
  if (header) {
    const token = header.split(" ")[1],
      parts = new Buffer.from(token, 'base64').toString().split(':'),
      username = parts[0],
      password = parts[1];
    User.findOne({
      'username': username
    }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((success) => {
          if (!success) { // incorrect password
            res.status(403).send("Incorrect password.");
          } else {
            // authenticated
            req.user = user;
            next();
          }
        });
      } else {
        res.status(403).send("User " + username + " not found.");
      }
    });
  } else { // No authentication provided, proceed with no permissions.
    next();
  }
});

router.use('/', baseRouter);
app.use('/', router);

app.listen(port);

console.log('RESTful API server started on: ' + port);