// eslint-disable

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import { fetchUser, checkin } from '../../reducers/authReducer';
import _ from 'lodash';
import moment from 'moment';

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
    this.state = {
      localHistory: []
    };
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
    const { localHistory } = this.state;
    actions.checkin(user)
    .then(() => {
      toastr.info(`${user.name}, ticket type: ${user.tickettype} has successfully checked in`);
      localHistory.push({ ...user, msg: 'checked in successfull' });
    })
    .catch((e) => toastr.error(e));
  }

  handleScanSuccess(data) {
    const { actions } = this.props;
    const { localHistory } = this.state;
    const regex = /No: \w+/;
    const parts = regex.exec(data);
    if (parts && parts.length) {
      const idSepetate = parts[0].split(' ');
      const id = idSepetate[idSepetate.length - 1];
      actions.fetchUser(id)
      .then((user) => {
        if (!_.isEmpty(user)) {
          if (user.checked === '1') {
            toastr.error(`${user.name}, ticket type: ${user.tickettype} has already checked in`);
            localHistory.push({ ...user, msg: 'Already checked in' });
          } else if (user.valid === '1') {
            this.handleCheckin(user);
          } else {
            localHistory.push({ ...user, msg: 'User is not valid' });
            toastr.error('User is not valid');
          }
          this.setState({ localHistory });
        }
      })
      .catch((e) => toastr.error(e));
    }
  }

  render() {
    const { localHistory } = this.state;
    const message = _.map(localHistory, (h) =>
    (<ul>
      <li>
        Name: <b> {h.name} </b>,  Message: <b> {h.msg} </b>, Ticket Type: <b>{h.tickettype}</b>, date: <b>{moment().format('YYYY-mm-dd HH:mm:ss')}</b>
      </li>
    </ul>));
    return (
      <div>
        <div className="app-body-container" id="landing-layout">
          <video id="preview"></video>
        </div>
        <h2>History</h2>
        {message}
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
