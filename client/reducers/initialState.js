import Cookie from 'js-cookie';

const initialState = {
  auth: {
    authenticated: Cookie.get('authenticated') === true,
    token: Cookie.get('token'),
    id: Cookie.get('id'),
    name: Cookie.get('name'),
    email: Cookie.get('email'),
  },
  user: {
    name: '',
    email: '',
  },
  location: {
    loca: {
      name: '',
      loc: [0.0, 0.0],
    },
    allLoc: [],
  },
};

export default initialState;
