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

class ImageForm extends Component {

  state = {
    image_id: '',
    image_name: '',
    isize: '',
    igroup: '',
    images: [],
    waitting: false
  }

  reset = () => {
      const state = {
        image_id: '',
        image_name: '',
        isize: '',
        igroup: ''
      }
      this.setState({...state})
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
    axios.post(Constants.imagesCreateRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show();
            this.reset();
            history.push('/images')
          } else {
            if (typeof(res.data.mess) !== 'undefined') {
              Constants.mess.show('error', res.data.mess);
            } else {
              Constants.mess.show('error', 'Lỗi create');
            }
          }
          this.setState({waitting: false})
        },
        (error) => { Constants.mess.show('error', 'Lỗi');this.setState({waitting: false}); }
    );
  }

  onUpdate = () => {
    let history = createHistory()
    axios.post(Constants.imagesUpdateRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show();
            this.reset();
            history.push('/images')
          } else {
            Constants.mess.show('error', 'Lỗi create');
          }
          this.setState({waitting: false})
        },
        (error) => { Constants.mess.show('error', 'Lỗi');this.setState({waitting: false}) }
    );
  }

  handleDel = () => {
    this.setState({waitting: true})
    let history = createHistory()
    axios.post(Constants.imagesDeleteRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show('success', 'Xóa thành công');
            history.push('/images')
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
      const image_id = Number(this.props.match.params.id)
      axios.post(Constants.imagesDetailRoute, {image_id: image_id})
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
  }

  render() {
    const { waitting, image_name, isize, igroup, image_id, images } = this.state
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
            {/*
              typeForm === 'create' ?
              <Input isImagesSelect={true} onChangeValue={this.onChangeValue} defaultValue={image_name} selects={images} kind="select" classList="mr-t-10" label="Image name" placeholder="" name="image_name"/> :
              <Input disabled={true} onChangeValue={this.onChangeValue} value={image_name} kind="input" classList="mr-t-10" label="Image name" placeholder="" name="image_name" type="text" iconName="key"/>
            */}

            <Input disabled={typeForm !== 'create'} onChangeValue={this.onChangeValue} value={image_name} kind="input" classList="mr-t-10" label="Image name" placeholder="" name="image_name" type="text" iconName="key"/>
          </div>
          <div className="col col-6">
            {
              (typeForm === 'edit' || typeForm === 'detail') &&
              <Input disabled={true} onChangeValue={this.onChangeValue} value={isize} kind="input" classList="mr-t-10" label="Size" placeholder="" name="isize" type="text" iconName="key"/>
            }
            <Input onChangeValue={this.onChangeValue} value={igroup} kind="input" classList="mr-t-10" label="Group" placeholder="" name="igroup" type="text" iconName="user"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageForm)
