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

const store = configureStore();

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(login(user.uid));
        API.getUser(user.uid).then((currentUser) => {
            store.dispatch(getUser(currentUser))
            renderApp();
            if(history.location.pathname === "/"){
                history.push('/dashboard'); 
            }
        })
        
    } else {
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});

