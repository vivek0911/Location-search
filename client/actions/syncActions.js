exports.signedUp = payload => ({ type: 'USER_SIGNED_UP', payload });
exports.loginSuccess = payload => ({ type: 'LOGGED_IN', payload });
exports.gotAllLocations = payload => ({ type: 'GOT_ALL_LOC', payload });
exports.locationAdded = payload => ({ type: 'LOC_ADDED', payload });

