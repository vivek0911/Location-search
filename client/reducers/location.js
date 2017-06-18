import _ from 'lodash';
import initialState from './initialState';

export default function auth(state = initialState.location, action) {
  switch (action.type) {
    case 'LOC_ADDED':
      return _.assign({}, state, { loca: action.payload, allLoc: [action.payload, ...state.allLoc] });
    case 'GOT_ALL_LOC':
      return _.assign({}, state, { allLoc: action.payload });
    default:
      return state;
  }
}
