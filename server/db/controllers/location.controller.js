const locationService = require('../services/location.service');
const _ = require('lodash');


exports.addLocation = (request, response) => {
  locationService.addLocation(request.body)
    .then((location) => {
      response.status(200).send(location);
    })
    .catch((error) => {
      response.status(404).send(error);
    });
};

exports.getAllLocations = (request, response) => {
  locationService.getAllLocations()
    .then((locs) => {
      response.status(200).send(locs);
    })
    .catch((error) => {
      response.status(404).send(error);
    });
};
