import React, { Component } from 'react';
import { connect } from "react-redux";

export class AuthExpired extends Component {
  render() {

    return (
      <div style={{margin: '0 auto', width: '400px'}}>
        <h1>Your login has expired, please <a href={this.props.loginUrl}>log in</a> again.</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    loginUrl: state.auth.loginUrl,
    logoutUrl: state.auth.logoutUrl

  };
}

export default connect(mapStateToProps)(AuthExpired);
