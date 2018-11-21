import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorComponent extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
  }

  render() {
    const { message } = this.props;
    return (
      <div className="position-relative">
        <div id="error-page">
          <span>We’re sorry.
            <br />
            {message}
          </span>
        </div>
      </div>
    );
  }
}

export default ErrorComponent;
