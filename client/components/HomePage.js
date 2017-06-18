import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './HomePage.scss';

class HomePage extends Component {
  home() {
    this.props.dispatch(push('/login'));
  }
  render() {
    return (<div className="homepage">
      <div className="middle">
        <h1 className="h1">Welcome</h1>
        <button onClick={this.home.bind(this)}>Click Here</button>
      </div>
    </div>);
  }
}
HomePage.defaultProps = {
  dispatch: () => {},
};
HomePage.propTypes = {
  dispatch: PropTypes.func,
};
const select = state => ({ state });
export default connect(select)(HomePage);
