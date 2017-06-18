import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    return this.props.children;
  }
}
App.propTypes = {
  children: PropTypes.any.isRequired,
};
export default App;

