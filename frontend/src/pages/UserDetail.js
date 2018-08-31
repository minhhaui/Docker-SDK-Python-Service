import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import User from './../form/User'


function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
  }
}

class UserDetail extends Component {

  state = {
      mail: '',
      user_password: '',
      user_name: '',
      position: '',
      user_id: ''
  }

  reset = () => {
      const state = {
        mail: '',
        user_password: '',
        user_name: '',
        position: '',
        user_id: ''
      }
      this.setState({...state})
  }

  render() {
    const { userRedux } = this.props
    if (!userRedux.loged) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <User typeForm="detail" {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
