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
        console.log(user);

        API.getUser({ uid: user.uid}).then((response) => {
            console.log("Successful");
            console.log(response);
            store.dispatch(getUser(response.data[0]))
            renderApp();
            if(history.location.pathname === "/"){
                history.push('/dashboard'); 
            }
        }).catch((err, data) => {
            console.log("Fail")
            console.log(data);
            console.log(err);
        })
        
    } else {
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});

