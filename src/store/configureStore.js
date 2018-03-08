import { createStore, combineReducers , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import searchReducer from '../reducers/search';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            search: searchReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    console.log(store)
    return store;
}

