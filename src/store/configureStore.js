import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer.js';

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const configureStore = () => {
    return createStore(
        rootReducer,
        composeEnhancer(applyMiddleware(thunk))
    )
}

export default configureStore;