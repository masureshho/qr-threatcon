import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import ErrorComponent from './common/ErrorComponent';


class ErrorPage extends Component {
  static propTypes = {
    actions:  PropTypes.object.isRequired,
  }

  render() {
    const errorMessage = 'we can’t seem to find the page you’re looking for. :(';
    return (
      <ErrorComponent message={errorMessage} {...this.props} />
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ pushState: push }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
