
const User = require('../models/user.model');
const crypto = require('crypto');
const constants = require('../constant');

const PASSWORD_SALT = constants.PASSWORD_SALT;

exports.generateHashPassword = passwordText => new Promise((resolve, reject) => {
  crypto.pbkdf2(passwordText, PASSWORD_SALT, 10000, 512, 'sha512', (err, derivedKey) => {
    if (err) {
      reject(err);
    }
    resolve(derivedKey);
  });
});

exports.getUserByEmailAndPassword = (email, pwd) => new Promise((resolve, reject) => {
  User.findOne({ email, password: pwd }, (error, user) => {
    if (error) {
      reject(error);
    } else if (user) {
      resolve(user && user.toObject());
    } else {
      reject('User Not Found');
    }
  });
});

exports.getUserByEmail = email => new Promise((resolve, reject) => {
  User.findOne({ email }, (error, user) => {
    if (error) {
      reject(error);
    } else if (user) {
      resolve(user && user.toObject());
    } else {
      resolve(user); // empty user
    }
  });
});

exports.addUser = user =>
    new Promise((resolve, reject) => {
      User.create(user, (error, createdUser) => {
        if (error) {
          reject(error);
        }
        resolve(createdUser && createdUser.toObject());
      });
    });
