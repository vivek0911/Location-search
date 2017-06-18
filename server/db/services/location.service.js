const Loc = require('../models/location.model');

exports.addLocation = location =>
new Promise((resolve, reject) => {
  Loc.create(location, (error, createdLoc) => {
    if (error) {
      reject(error);
    }
    resolve(createdLoc && createdLoc.toObject());
  });
});

exports.getAllLocations = () => new Promise((resolve, reject) => {
  Loc
    .find({})
    .exec((error, results) => {
      if (error) {
        reject(error);
      }
      const users = (results || []).map(loc => loc && loc.toObject());
      resolve(users);
    });
});
