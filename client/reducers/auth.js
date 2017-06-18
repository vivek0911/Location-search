import _ from 'lodash';
import Cookie from 'js-cookie';
import initialState from './initialState';

export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case 'LOGGED_IN': {
      const payload1 = action.payload || {};
      Cookie.set('token', payload1.token); Cookie.set('id', payload1.id); Cookie.set('email', payload1.email);
      Cookie.set('name', payload1.name);
      return _.assign({}, state, {
        name: payload1.name,
        email: payload1.email,
        id: payload1.id,
        token: payload1.token });
    }
    case 'USER_SIGNED_UP': {
      const payload2 = action.payload || {};
      Cookie.set('token', payload2.token); Cookie.set('id', payload2.id); Cookie.set('email', payload2.email);
      Cookie.set('name', payload2.name);
      return _.assign({}, state, {
        name: payload2.name,
        email: payload2.email,
        id: payload2.id,
        token: payload2.token });
    }
    // case ActionTypes.LOGIN_FAILED: {
    //   console.log(action.payload);
    //   return _.assign({}, state, { loginError: action.payload });
    // }
    default:
      return state;
  }
}
