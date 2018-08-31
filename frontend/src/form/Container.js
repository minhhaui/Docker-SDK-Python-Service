import React, { Component } from 'react';
import { Button, Select, Spin } from 'antd';
import * as Constants from '../constants/var'
import axios from 'axios';

import { connect } from 'react-redux'
import Input from './../components/Input'

import createHistory from 'history/createHashHistory';

function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
  }
}

class ContainerForm extends Component {

  state = {
    container_id: '',
    container_docker_id: '',
    cpu: '',
    memory: '',
    port: '',
    container_password: '',
    image_name: '',
    images: [],
    user_id: '',
    users: [],
    waitting: false
  }

  reset = () => {
      const state = {
        container_id: '',
        container_docker_id: '',
        cpu: '',
        memory: '',
        port: '',
        container_password: '',
        image_name: '',
        images: [],
        user_id: '',
        users: []
      }
      this.setState({ ...state })
  }

  onChangeValue = (name, value) => {
    var obj  = {}
    obj[name] = value
    this.setState({
        ...obj
    })
  }

  handleSubmit = () => {
    this.setState({waitting: true})
    const { typeForm } = this.props
    if (typeForm === 'create') {
      this.onCreate()
    } else if (typeForm === 'edit') {
      this.onUpdate()
    }
  }

  onCreate = () => {
    let history = createHistory()
    axios.post(Constants.containersCreateRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show();
            this.reset();
            history.push('/containers')
          } else {
            Constants.mess.show('error', 'Lỗi create');
          }
          this.setState({waitting: false})
        },
        (error) => { Constants.mess.show('error', 'Lỗi');this.setState({waitting: false}); }
    );
  }

  onUpdate = () => {
    let history = createHistory()
    axios.post(Constants.containersUpdateRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show();
            this.reset();
            history.push('/containers')
          } else {
            Constants.mess.show('error', 'Lỗi update');
          }
          this.setState({waitting: false})
        },
        (error) => { Constants.mess.show('error', 'Lỗi');this.setState({waitting: false}); }
    );
  }

  handleDel = () => {
    this.setState({waitting: true})
    let history = createHistory()
    axios.post(Constants.containersDeleteRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show('success', 'Xóa thành công');
            history.push('/containers')
          } else {
            Constants.mess.show('error', 'Xóa thất bại');
          }
          this.setState({waitting: false})
         },
        (error) => { Constants.mess.show('error', 'Lỗi');this.setState({waitting: false}); }
    );
  }

  componentDidMount() {
    const { typeForm } = this.props
    if (typeForm === 'edit' || typeForm === 'detail') {
      // get current image info
      const container_id = Number(this.props.match.params.id)
      axios.post(Constants.containersDetailRoute, {container_id: container_id})
      .then(
          (res) => {
            let data = res.data
            this.setState({
              ...data
            })
          },
          (error) => { Constants.mess.show('error', 'Lỗi'); }
      );
    }

    // get list images
    axios.post(Constants.imagesRoute, {})
    .then(
      (res) => {
        let data = res.data
        this.setState({
          images: data
        })
      },
      (error) => { Constants.mess.show('error', 'Lỗi'); }
    );

    // get list users
    axios.post(Constants.usersRoute, {})
    .then(
      (res) => {
        let data = res.data
        this.setState({
          users: data
        })
      },
      (error) => { Constants.mess.show('error', 'Lỗi'); }
    );
  }

  render() {
    const { waitting, container_id, container_docker_id, cpu, memory, port, container_password, image_name, images, user_id, users } = this.state
    const { typeForm } = this.props

    return (
      <div>
        {
          waitting &&
          <Spin tip="Waitting..." className="t-spin"/>
        }
        <div className="row">
          <div className="col col-12 text-center mr-t-20">
            <h5>{typeForm}</h5>
          </div>

          <div className="col col-6">
            {
              typeForm !== 'create' &&
              <span>
                <Input disabled={true} onChangeValue={this.onChangeValue} value={container_id} kind="input" classList="mr-t-10" label="Container ID" placeholder="" name="container_id" type="text" iconName="key"/>
                <Input disabled={true} onChangeValue={this.onChangeValue} value={container_docker_id} kind="input" classList="mr-t-10" label="Container docker ID" placeholder="" name="container_docker_id" type="text" iconName="key"/>
              </span>
            }
            <Input onChangeValue={this.onChangeValue} value={cpu} kind="input" classList="mr-t-10" label="CPU" placeholder="" name="cpu" type="text" iconName="key"/>
            <Input onChangeValue={this.onChangeValue} value={memory} kind="input" classList="mr-t-10" label="Memory" placeholder="" name="memory" type="text" iconName="key"/>
          </div>
          <div className="col col-6">
            <Input onChangeValue={this.onChangeValue} value={port} kind="input" classList="mr-t-10" label="Port" placeholder="" name="port" type="number" iconName="key"/>
            <Input onChangeValue={this.onChangeValue} value={container_password} kind="input" classList="mr-t-10" label="Password" placeholder="" name="container_password" type="text" iconName="key"/>

            <Input isImagesSelect={true} onChangeValue={this.onChangeValue} defaultValue={image_name} selects={images} kind="select" classList="mr-t-10" label="Image name" placeholder="" name="image_name"/>

            <Input isUsersSelect={true} onChangeValue={this.onChangeValue} defaultValue={user_id} selects={users} kind="select" classList="mr-t-10" label="User" placeholder="" name="user_id"/>
          </div>
        </div>

        <div className="row">
          <div className="col col-12">
            <div className="mr-t-20 text-right">
                {
                  typeForm === 'create' &&
                  <span>
                    <Button className="mr-r-10" type="primary" onClick={this.handleSubmit}>Create</Button>
                    <Button className="mr-r-10" onClick={this.reset}>Reset</Button>
                  </span>
                }
                {
                  (typeForm === 'edit' || typeForm === 'detail') &&
                  <Button className="mr-r-10" type="primary" onClick={this.handleSubmit}>Update</Button>
                }
                {
                  (typeForm === 'detail' || typeForm === 'edit') &&
                  <Button type="danger" onClick={this.handleDel}>Destroy</Button>
                }
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerForm)
