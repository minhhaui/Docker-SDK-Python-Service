// // @flow
import { handleActions } from 'redux-actions'
import * as ActionTypes from '../actions/action_types'

export const initialState = {
  user: {
    loged: false,
    user_id: 0,
    user_name: 'Trung Hồ Ngọc',
    user_password: '',
    position: ''
  }
}

const userRedux = handleActions({
  [ActionTypes.GET_USER_INFO]: (state: any, action: any): any => {
    return { ...state }
  },
  [ActionTypes.SET_USER_INFO]: (state: any, action: any): any => {
    let newState = state
    newState.user = { ...action.payload }
    console.log('newState:', newState)
    return newState
  }
}, initialState)

export default userRedux