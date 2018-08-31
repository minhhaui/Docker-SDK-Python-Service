import React, { Component } from 'react';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import axios from 'axios';
import * as Constants from './../constants/var'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAction from './../actions/user'

const ButtonGroup = Button.Group;

function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
    actRedux: bindActionCreators(userAction, dispatch)
  }
}


class Navbar extends Component {
  state = {
    current: 'dashboard',
    history: createHistory()
  }

  componentDidMount() {
    let pathName = this.state.history.location.pathname.replace('/', '')
    this.setState({
      current: pathName
    })
  }

  showMess = (success) => {
    if (success) {
        message.success('Đăng xuất thành công', 1)
    } else {
        message.error('Xảy ra lỗi', 1)
    }
  }

  logout = () => {
    axios.post(Constants.logoutRoute, this.state)
    .then(
        (res) => { this.showMess(true); this.fakeLogout(); },
        (error) => { this.showMess(false); this.fakeLogout(); }
    );
  }

  fakeLogout = () => {
    this.props.actRedux.actSetUser({
        loged: false
    })

    localStorage.removeItem('user')
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  logout = () => {
    axios.post(Constants.logoutRoute, this.state)
    .then(
        (res) => {
          if (res.data.result) {
            this.showMess(true);
            this.setLogout();
          } else {
            Constants.mess.show('error', 'Error')
          }
        },
        (error) => { this.showMess(false); }
    );
  }

  setLogout = () => {
    localStorage.removeItem('user')
    this.props.actRedux.actSetUser({
      loged: false
    })
    const history = createHistory()
    history.push('/login')
  }

  render() {
    const { userRedux } = this.props
    // console.log('====redux:', userRedux)
    // if (userRedux.loged === false) {
    //   return <div></div>
    // }

    return (
      <div className="text-center">
        <div className="mr-t-10"></div>
        <ButtonGroup>
          <Button>
            <Link to="/users">Users</Link>
          </Button>
          <Button>
            <Link to="/images">Images</Link>
          </Button>
          <Button>
            <Link to="/containers">Containers</Link>
          </Button>
          <Button onClick={ this.logout }>
            Logout
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
