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
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/favorites" >
                            <img src="/images/logo-purple2.png" alt="EAT NEAT"/>
                        </Link>
                    </div>
                    <ul className="navbar__list">
                            <li className="navbar__item"><Link to="/why">WHY</Link></li>
                            <li className="navbar__item"><Link to="/about">ABOUT</Link></li>     
                            <li className="navbar__item"><Link to="/faq">FAQ</Link></li>
                            <li className="navbar__item"><button className="button" onClick={this.props.startLogout}>LOGOUT</button></li>          
                        </ul>
                </div>
            </nav>
            <nav className="secondary-nav">
                <ul>     
                    <li><Link to="/favorites" >My Favorites</Link></li> 
                    <li><Link to="/myweek" >My Week</Link></li>         
                    <li><Link to="/grocerylist" >My Grocery List</Link></li> 
                    <li><Link to="/search" >Search</Link></li>
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