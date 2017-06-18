const express = require('express');
const router = express.Router();

const userController = require('./controllers/user.controller');
const locController = require('./controllers/location.controller');

router.post('/user/register', userController.registerUser);
router.post('/user/signin', userController.SignIn);
router.post('/loca/add', locController.addLocation);
router.get('/locations/all', locController.getAllLocations);

module.exports = router;
