import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ImageForm from './../form/Image'


function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
  }
}

class ImageEdit extends Component {
  render() {
    const { userRedux } = this.props
    if (!userRedux.loged) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <ImageForm typeForm="edit" { ...this.props }/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageEdit)
