import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import FavoritesPage from '../components/FavoritesPage';
import MyWeekPage from '../components/MyWeekPage';
import GroceryListPage from '../components/GroceryListPage';
import SearchPage from '../components/SearchPage';
import AboutPage from '../components/AboutPage';
import FaqPage from '../components/FaqPage';
import WhyPage from '../components/WhyPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { ToastContainer, style } from 'react-toastify';

export const history = createHistory();

style({
    colorInfo: "#25283D",
    TOP_RIGHT: {
        top: '5em',
        right: '1em'
    },
});

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/favorites" component={FavoritesPage}/>
                <PrivateRoute path="/myweek" component={MyWeekPage}/>
                <PrivateRoute path="/grocerylist" component={GroceryListPage}/>
                <PrivateRoute path="/search" component={SearchPage}/>
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/faq" component={FaqPage} />
                <PrivateRoute path="/why" component={WhyPage} />
                <Route component={NotFoundPage}/>
            </Switch>
            <ToastContainer autoClose={8000} />
        </div>
        
    </Router>
);

export default AppRouter;