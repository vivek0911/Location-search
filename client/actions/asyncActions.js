import Request from 'axios';
import _ from 'lodash';
import syncActions from './syncActions';

const ip = '/api';
function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}


exports.signUpUser = data => dispatch => makeRequest('post', '/user/register', data)
      .then(response => dispatch(syncActions.signedUp(response.data)));

exports.loginUser = data => dispatch => makeRequest('post', '/user/signin?type=local', data)
.then(response => dispatch(syncActions.loginSuccess(_.assign({}, response.data, _.omit(data, ['password'])))));
// .catch((err) => {
//       console.log(`this is error status: ${err.status}`);
//       return dispatch(syncActions.loginFailed(err));
// });

exports.fetchAllLocations = () => dispatch => makeRequest('get', '/locations/all')
      .then(response => dispatch(syncActions.gotAllLocations(response.data)));
exports.addLocation = data => dispatch => makeRequest('post', '/loca/add', data)
      .then(response => dispatch(syncActions.locationAdded(response.data)));
