import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from "../actions/auth";
import SearchBar from './SearchBar';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

export class ENNavBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showSearch: false
        }
    }
    

    onHandleShowSearchBar = () => {
        console.log("clicked");
        this.setState({ showSearch: !this.state.showSearch });
    }

    onHandleCloseSearchBar = (e) => {
        e.preventDefault();
        this.setState({ showSearch: false });
    }

    

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
                            <li className="navbar__item"><Link to="/favorites">Hi {this.props.auth.username}!</Link></li>
                            <li className="navbar__item"><Link to="/faq">FAQ</Link></li>
                            <li className="navbar__item"><Link to="/about">About</Link></li>     
                            <li className="navbar__item"><Link to="/why">Why Eat Neat</Link></li>
                            <li className="navbar__item"><button className="button button--link" onClick={this.props.startLogout}>Logout</button></li>          
                        </ul>
                </div>
            </nav>
            <nav className="secondary-nav">
                <ul>
                    <li><Link to="/search" >Search</Link></li>     
                    <li><Link to="/myweek" >Meal Plan</Link></li>     
                    <li><Link to="/favorites" >Recipe Book</Link></li>     
                    <li><Link to="/grocerylist" >Grocery List</Link></li>
                    <li><button onClick={this.onHandleShowSearchBar} className="button--search"><i className="fa fa-search" aria-hidden="true"></i></button></li> 
                </ul>
            </nav>
            {this.state.showSearch ? <SearchBar history={this.props.history} onHandleCloseSearchBar={this.onHandleCloseSearchBar}/>  : false}
            
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(ENNavBar);