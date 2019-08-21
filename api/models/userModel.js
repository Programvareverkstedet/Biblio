'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permission_set = {
  add_books: {
    type: Boolean,
    default: true
  },
  update_books: {
    type: Boolean,
    default: false
  },
  borrow_books: {
    type: Boolean,
    default: true
  },
  add_users: {
    type: Boolean,
    default: false
  },
  delete_users: {
    type: Boolean,
    default: false
  },
  delete_books: {
    type: Boolean,
    default: false
  },
  update_users: {
    type: Boolean,
    default: false
  },
  change_permissions: {
    type: Boolean,
    default: false
  }
};

const UserSchema = new Schema({
  username: {
    type: String,
    required: 'Username missing'
  },
  password: {
    type: String,
    required: 'Password missing'
  },
  email: String,
  student_card: String,
  borrowing: [{
    bookId: Schema.Types.ObjectId,
    date: Date
  }],
  permissions: permission_set
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    const json = {
      username: ret.username,
      borrowing: ret.borrowing,
      permissions: ret.permissions,
      _id: ret._id
    };
    return json;
  }
});

module.exports = mongoose.model('User', UserSchema);