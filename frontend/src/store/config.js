// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'

const enhancer = compose(
    applyMiddleware(
    ),
)

function configureStore(initialState: any) {
    const store = createStore(rootReducer, initialState, enhancer)
    return store
}

export default configureStore
