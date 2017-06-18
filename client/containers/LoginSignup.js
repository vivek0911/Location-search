import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';
import './LoginSignup.scss';
import asyncActions from '../actions/asyncActions';

class LoginSingup extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
      name: '',
      email: '',
      password: '',
    };
  }
  flip() {
    this.setState({ login: !this.state.login, email: '', password: '' });
  }
  onChange(field, e) {
    const that = this;
    const value = e.target.value;
    that.setState({ [field]: value });
  }
  onLoginSignup() {
    const { name, email, password } = this.state;
    if (this.state.login) {
      this.props.dispatch(asyncActions.loginUser({ email, password }))
      .then((payload) => {
        const data = payload.payload;
        if (data.token) this.props.dispatch(push('/loc'));
      });
    } else {
      this.props.dispatch(asyncActions.signUpUser({ name, email, password }))
      .then((payload) => {
        const data = payload.payload;
        if (data.token) this.props.dispatch(push('/loc'));
      });
    }
  }
  render() {
    const that = this;
    const { login, name, email, password } = that.state;
    return (
      <div className="login-wrapper">
        <div className="modules">
          <div className="middle">
            <div className="title">
              <b className={login ? 'active' : ''} onClick={that.flip.bind(that)}>LOGIN</b>
              <b className={!login ? 'active' : ''} onClick={that.flip.bind(that)}>SIGNUP</b>
            </div>
            <div className="form">
              {!login ?
                <input value={name} type="text" onChange={that.onChange.bind(that, 'name')} placeholder="name" /> : ''
              }
              <input value={email} type="text" onChange={that.onChange.bind(that, 'email')} placeholder="email" />
              <input value={password} type="password" onChange={that.onChange.bind(that, 'password')} placeholder="password" />
              <button onClick={that.onLoginSignup.bind(that)}>{login ? 'LOG IN' : 'SIGN UP'}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
LoginSingup.defaultProps = {
  dispatch: () => {},
};
LoginSingup.propTypes = {
  dispatch: PropTypes.func,
};
const select = state => ({ state });
export default connect(select)(LoginSingup);

