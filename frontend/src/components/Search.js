import React, { Component } from 'react';
import Select from 'react-select';
import * as Constants from '../constants/var'
import axios from 'axios';


class MySearch extends Component {
  emitEmpty = () => {
    this.input.focus();
  }

  imagesSearch(keyword = '') {
    axios.post(Constants.imagesSearchRoute, {keyword: keyword})
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

  onChangeSelect = (value) => {
    const {name} = this.props
    this.props.onChangeValue(name, value)
  }

  render() {
    const { classList, label, selects, selectedOption, name } = this.props

    return (
      <div className={classList}>
        <label>{label}</label>
        <Select
          value={selectedOption}
          onChange={this.onChangeSelect}
          options={selects}
          name={name}
          styles={ {width: 300} }
        />
      </div>
    );
  }
}

export default MySearch