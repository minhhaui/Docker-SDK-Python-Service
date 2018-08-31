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

class Container extends Component {
  state = {
    data: [
    ]
  }

  componentDidMount() {
    axios.post(Constants.containersRoute, {})
    .then(
      (res) => {
        let data = res.data
        this.setState({
          data: data
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
    const { data } = this.state
    const { userRedux } = this.props
    if (!userRedux.loged) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <div className="row">
          <div className="col col-6">
            <h5>Containers</h5>
            <p>{data.length} Conainer</p>
          </div>
          <div className="col col-6 text-right">
            <Link to="/containers/create">
              <Button type="primary" icon="plus">Container</Button>
            </Link>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <thead>
            <tr className="text-center">
              <td>ID</td>
              <td>Container docker id</td>
              <td>CPU</td>
              <td>Memory</td>
              <td>Port</td>
              <td>Password</td>
              <td>Image name</td>
              <td>User</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return <tr key={index}>
                  <td>
                    <Link to={"/containers/edit/" + item.container_id}>
                    {item.container_id}
                    </Link>
                  </td>
                  <td>{item.container_docker_id}</td>
                  <td>{item.cpu}</td>
                  <td>{item.memory}</td>
                  <td>{item.port}</td>
                  <td>{item.container_password}</td>
                  <td>{item.image_name}</td>
                  <td>{item.user_name}</td>
                </tr>
              })
            }
          </tbody>
        </table>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
