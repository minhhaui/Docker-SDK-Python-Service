import React, { Component } from 'react';
import LoginForm from './../form/Login'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
  }
}

class Login extends Component {
  render() {
    const { userRedux } = this.props
    if (userRedux.loged) {
      return <Redirect to="/"/>
    }
    return (
      <LoginForm/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
