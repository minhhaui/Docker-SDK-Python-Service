import React, { Component } from 'react';
import { Button, Spin } from 'antd';
import axios from 'axios';
import * as Constants from './../constants/var'
import Input from './../components/Input'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAction from './../actions/user'

import createHistory from 'history/createHashHistory';

import { Redirect } from 'react-router-dom'

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

class LoginForm extends Component {
    state = {
        mail: '',
        user_password: '',
        waitting: false
    }

    reset = () => {
        const state = {
            mail: '',
            user_password: ''
        }
        this.setState({...state})
    }

    handleSubmit = (values) => {
        this.setState({waitting: true})
        axios.post(Constants.loginRoute, this.state)
        .then(
            (res) => { this.loginSuccess(res); },
            (error) => { Constants.mess.show('error', 'Lỗi'); this.setState({waitting: false}); }
        );
    }

    loginSuccess = (res) => {
        this.setState({waitting: false})
        let history = createHistory()
        let data = res.data
        if (data.result) {
            let user = {
                loged: true,
                ...data.user
            }
            localStorage.setItem('user', JSON.stringify(user))
            this.props.actRedux.actSetUser(user)
            Constants.mess.show()
            history.push('/users')
            console.log('this.props (login)', this.props)
        } else {
            Constants.mess.show('error', 'Tài khoản hoặc mật khẩu không chính xác')
        }
    }

    onChangeValue = (name, value) => {
        var obj  = {}
        obj[name] = value
        this.setState({
            ...obj
        })
    }


  render() {
    let { waitting, mail, user_password } = this.state

    const { userRedux } = this.props
    if (userRedux.loged) {
      return <Redirect to="/"/>
    }

    return (
      <div className="login-form">
        {
            waitting &&
            <Spin tip="Waitting..." className="t-spin"/>
        }
        <p className="text-center">Let's get started. Please Login.</p>

        <Input onChangeValue={this.onChangeValue} value={mail} kind="input" classList="mr-t-10" label="Email" placeholder="" name="mail" type="email" iconName="mail"/>
        <Input onChangeValue={this.onChangeValue} value={user_password} kind="input" classList="mr-t-10" label="Password" placeholder="" name="user_password" type="password" iconName="key"/>

        <div className="mr-t-20 text-right">
            <Button type="primary" onClick={this.handleSubmit}>Login</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
