import React from "react";
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import FavoritesPage from '../components/FavoritesPage';
import MyWeekPage from '../components/MyWeekPage';
import GroceryListPage from '../components/GroceryListPage';
import SearchPage from '../components/SearchPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <PrivateRoute path="/favorites" component={FavoritesPage}/>
                <PrivateRoute path="/myweek" component={MyWeekPage}/>
                <PrivateRoute path="/grocerylist" component={GroceryListPage}/>
                <PrivateRoute path="/search" component={SearchPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
        
    </Router>
);

export default AppRouter;