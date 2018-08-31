import React, { Component } from 'react';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import * as Constants from '../constants/var'
import axios from 'axios';

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

class User extends Component {
  state = {
    users: [
    ]
  }

  componentDidMount() {
    axios.post(Constants.usersRoute, {})
    .then(
      (res) => {
        let users = res.data
        this.setState({
          users: users
        })
      },
      (error) => { this.showMess(false) }
    );
  }

  showMess = (success) => {
    if (success) {
    } else {
      message.error('Xảy ra lỗi', 1)
    }
  }

  render() {
    const { users } = this.state
    const { userRedux } = this.props
    if (!userRedux.loged) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <div className="row">
          <div className="col col-6">
            <h5>Nhân viên</h5>
            <p>{users.length} Người</p>
          </div>
          <div className="col col-6 text-right">
            <Link to="/users/create">
              <Button type="primary" icon="plus">Nhân viên</Button>
            </Link>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <thead>
            <tr className="text-center">
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Chức vụ</td>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => {
                return <tr key={index}>
                  <td>
                    <Link to={"/users/edit/" + user.user_id}>
                    {user.user_id}
                    </Link>
                  </td>
                  <td>
                    <Link to={"/users/edit/" + user.user_id}>
                      {user.user_name}
                    </Link>
                  </td>
                  <td>{user.mail}</td>
                  <td>{user.position}</td>
                </tr>
              })
            }
          </tbody>
        </table>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
