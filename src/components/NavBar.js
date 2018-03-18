import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from "../actions/auth";
import SearchBar from './SearchBar';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

export class ENNavBar extends React.Component {

    render(){
        return(
            <div>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/grocerylist" >
                            <img src="/images/logo-purple2.png" alt="EAT NEAT"/>
                        </Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/about">About</Link></li>     
                            <li><Link to="/why">Why Eat Neat</Link></li>
                            <li><button className="button" onClick={this.props.startLogout}>Logout</button></li>          
                        </ul>
                </div>
            </nav>
            <nav className="secondary-nav">
                <ul>
                    <li><Link to="/dashboard" >Dashboard Page</Link></li>
                    <li><Link to="/search" >Search Page</Link></li>     
                    <li><Link to="/myweek" >My Week Page</Link></li>     
                    <li><Link to="/favorites" >Favorites Recipes Page</Link></li>     
                    <li><Link to="/grocerylist" >Grocery List Page</Link></li> 
                </ul>
            </nav>
            <SearchBar history={this.props.history}/> 
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(ENNavBar);