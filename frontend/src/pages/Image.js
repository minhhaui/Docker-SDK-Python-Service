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

class Image extends Component {
  state = {
    data: [
    ]
  }

  componentDidMount() {
    axios.post(Constants.imagesRoute, {})
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
            <h5>Images</h5>
            <p>{data.length} Images</p>
          </div>
          <div className="col col-6 text-right">
            <Link to="/images/create">
              <Button type="primary" icon="plus">Image</Button>
            </Link>
          </div>
        </div>
        

        <table className="table table-hover table-bordered">
          <thead>
            <tr className="text-center">
              <td>ID</td>
              <td>Name</td>
              <td>Size</td>
              <td>Group</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return <tr key={index}>
                  <td>
                    <Link to={"/images/edit/" + item.image_id}>
                    {item.image_id}
                    </Link>
                  </td>
                  <td>
                    <Link to={"/images/edit/" + item.image_id}>
                      {item.image_name}
                    </Link>
                  </td>
                  <td>{item.isize}</td>
                  <td>{item.igroup}</td>
                </tr>
              })
            }
          </tbody>
        </table>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image)
