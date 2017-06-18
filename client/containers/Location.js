import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Location.scss';
import asyncActions from '../actions/asyncActions';

class LocationSearch extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loc: [],
      show: false,
    };
  }

  handleSearch(key, value) {
    this.setState({ [key]: value });
  }
  getAllLocation() {
    this.props.dispatch(asyncActions.fetchAllLocations())
    .then(payload => payload && this.setState({ show: true }));
  }
  geolocate() {
    const autocomplete = new google.maps.places.Autocomplete((document.getElementById('searchBox')),
      { types: ['geocode'], componentRestrictions: { country: 'in' } },
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      const loc = [place.geometry.location.lat(), place.geometry.location.lng()];
      this.props.dispatch(asyncActions.addLocation({ name: place.formatted_address, loc }));
      this.handleSearch('name', place.name);
      this.handleSearch('loc', loc);
    });
  }

  render() {
    const that = this;
    return (
      <div className="location-wrapper">
        <div className="middle">
          <p>Enter the location</p>
          <input
            value={that.state.name || ''} type="text" id="searchBox" onChange={e => that.handleSearch('name', e.target.value)}
            autoComplete onFocus={this.geolocate.bind(this)} placeholder="Location"
          />
        </div>
        <p className="all-loc" onClick={that.getAllLocation.bind(that)}>See All Locations</p>
        {that.state.show && <div className="list-wrap">
          <table>
            <tbody className="tbody">
              <tr style={{ fontStyle: 'italic' }}>
                <th>Location</th>
                <th>Co-ordinates</th>
              </tr>
              {
                (that.props.location.allLoc || []).map((x, key) => (
                  <tr key={key} style={{ border: '1px solid #fff' }}>
                    <th>{x.name}</th>
                    <th>{x.loc[0]}, {x.loc[1]}</th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>}
      </div>
    );
  }
}
LocationSearch.defaultProps = {
  dispatch: () => {},
};
LocationSearch.propTypes = {
  dispatch: PropTypes.func,
};
const select = state => ({ location: state.location });
export default connect(select)(LocationSearch);

