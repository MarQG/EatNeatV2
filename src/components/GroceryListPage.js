import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser } from "../actions/user";
import GroceryCard from './GroceryCard';


export class GroceryListPage extends React.Component {

    render(){
        return(   
        <div>
            {this.props.user.grocery_list.length > 0 ? this.props.user.grocery_list.map((grocery, i)=> (
                    <GroceryCard grocery={grocery} key={i} />
            ))  : <div></div> }
        </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    saveUser: (user) => dispatch(saveUser(user))
})

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(GroceryListPage);