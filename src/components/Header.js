import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth.js';
import SearchBar from "./SearchBar";
import ENNavBar from "./NavBar";

export class Header extends React.Component{
    
    render(){
        return(
            <header className="header">
                <ENNavBar history={this.props.history}/>
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);