import React, { Component } from 'react';
import createHistory from 'history/createHashHistory';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAction from './../actions/user'

function mapStateToProps(state: Object): Object {
  return {
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
    actRedux: bindActionCreators(userAction, dispatch)
  }
}

class CheckLogin extends Component {
  constructor(props) {
    super(props)

    let userLocalS = localStorage.getItem('user')
    if (userLocalS) {
      this.fillInfo()
    } else {
      this.logout()
    }
  }

  logout = () => {
    this.props.actRedux.actSetUser({
        loged: false
    })
  }

  fillInfo = () => {
    let userLocalS = localStorage.getItem('user')
    let userObj = JSON.parse(userLocalS)
    this.props.actRedux.actSetUser(userObj)
    console.log("userLocalS:", {userLocalS, userObj})
  }

  render() {
    let userLocalS = localStorage.getItem('user')
    const history = createHistory()
    let currentPath = history.location.pathname

    return (
      <div></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckLogin)
