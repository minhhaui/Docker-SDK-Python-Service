import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ContainerForm from './../form/Container'

function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
  }
}

class ContainerEdit extends Component {
  render() {
    const { userRedux } = this.props
    if (!userRedux.loged) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <ContainerForm typeForm="edit" { ...this.props }/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerEdit)
