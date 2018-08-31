import * as ActionTypes from './action_types'

export function actGetUser(value = null) {
    return {
        type: ActionTypes.GET_USER_INFO,
        payload: value
    }
}

export function actSetUser(value = null) {
    return {
        type: ActionTypes.SET_USER_INFO,
        payload: value
    }
}