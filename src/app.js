import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from "./components/LoadingPage";
import API from './utils/api';
import { getUser } from './actions/user';
import { setCurrentSearch } from './actions/search';

const store = configureStore();

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};

const defaultUserState = {
    user_id: '',
    favorites: [],
    my_week: {
        monday: ''
    },
    recent_searches: [],
    grocery_list: []
}

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(login(user.uid, user.displayName, user.photoURL));
        

        API.getUser({ uid: user.uid}).then((response) => {
            
            store.dispatch(getUser(response.data[0]))
            renderApp();
            if(history.location.pathname === "/"){
                history.push('/favorites'); 
            }
        }).catch((err) => {
            console.log(err);
        })
        
    } else {
        store.dispatch(getUser(defaultUserState));
        store.dispatch(setCurrentSearch())
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});

