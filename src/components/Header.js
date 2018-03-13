import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth.js';
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

export class Header extends React.Component{
    
    render(){
        return(
            <header className="header">
                <div className="content-container">
                    <div className="header__content">
                        <Link className="header__title" to="/dashboard" >
                            <img src="./images/eat_neat_logo_wht.png" alt="EAT NEAT"/>
                        </Link>
                        <button className="button button--link" onClick={this.props.startLogout}>Logout</button>
                    </div>
                    <NavBar />
                    <SearchBar history={this.props.history}/>
                </div>
                
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);