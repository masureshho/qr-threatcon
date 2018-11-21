// eslint-disable

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import { fetchUser, checkin } from '../../reducers/authReducer';
import _ from 'lodash';

class DashboardPage extends Component {
  static propTypes = {
    route: PropTypes.object,
    store: PropTypes.object,
    actions: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.handleScanSuccess = this.handleScanSuccess.bind(this);
    this.handleCheckin = this.handleCheckin.bind(this);
  }
  componentDidMount() {
    const Instascan = window.Instascan;
    if (Instascan !== undefined) {
      const scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });
      scanner.addListener('scan',  this.handleScanSuccess);
      Instascan.Camera.getCameras().then((cameras) => {
        if (cameras.length > 0) {
          scanner.start(cameras[cameras.length - 1]);
        } else {
          toastr.error('No cameras found.');
        }
      }).catch((e) => {
        console.error(e);
      });
    }
  }
  handleCheckin(user) {
    const { actions } = this.props;
    actions.checkin(user)
    .then(() => {
      toastr.info(`${user.name} has successfully checked in`);
    })
    .catch((e) => toastr.error(e));
  }

  handleScanSuccess(data) {
    const { actions } = this.props;
    const regex = /No: \w+/;
    const parts = regex.exec(data);
    if (parts && parts.length) {
      const idSepetate = parts[0].split(' ');
      const id = idSepetate[idSepetate.length - 1];
      actions.fetchUser(id)
      .then((user) => {
        if (!_.isEmpty(user)) {
          if (user.checked === '1') {
            toastr.error(`${user.name} has already checked in`);
          } else if (user.valid === '1') {
            this.handleCheckin(user);
          } else {
            toastr.error('User is not valid');
          }
        }
      })
      .catch((e) => toastr.error(e));
    }
  }

  render() {
    return (
      <div>
        <div className="app-body-container" id="landing-layout">
          <video id="preview"></video>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUser,
      checkin
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
