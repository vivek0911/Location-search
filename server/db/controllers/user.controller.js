const userService = require('../services/user.service');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const constants = require('../constant');

const jwtSecret = constants.JWT_SECRET_KEY;

exports.SignIn = (request, response) => {
  if (request.query.type === 'local') {
    const email = request.body.email;
    userService.generateHashPassword(request.body.password)
      .then((hashedPassword) => {
        const pwd = hashedPassword;
        console.log('getting user by email and pass');
        userService.getUserByEmailAndPassword(email, pwd)
          .then((user) => {
            if (user) {
              const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '30 days' });
              response.status(200).send({ token, id: user._id, name: user.name });
            }
          })
          .catch((error) => {
            response.status(404).send(error);
          });
      })
      .catch((error) => {
        response.status(404).send(error);
      });
  }
};

exports.registerUser = (request, response) => {
  userService.getUserByEmail(request.body.email)
    .then((user) => {
      if (user) {
        response.status(200).send({ message: 'Already registered' });
      } else {
        userService.generateHashPassword(request.body.password)
          .then((hashedPassword) => {
            console.log('hash passord generated');
            const payload = {
              name: request.body.name,
              email: request.body.email,
              password: hashedPassword,
            };
            userService.addUser(payload)
              .then((createdUser) => {
                const token = jwt.sign({ id: createdUser._id, email: request.query.email }, jwtSecret, { expiresIn: '30 days' });
                response.status(200).send(_.assign({}, createdUser, { token }));
              })
              .catch((error) => {
                response.status(422).send(error);
              });
          })
          .catch((error) => {
            response.status(422).send(error);
          });
      }
    })
    .catch((error) => {
      response.status(404).send(error);
    });
};
