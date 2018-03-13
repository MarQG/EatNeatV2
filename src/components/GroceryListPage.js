import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser } from "../actions/user";


export class GroceryListPage extends React.Component {

    render(){
        return(    
        <div>
            {this.props.user.grocery_list.length > 0 ? this.props.user.grocery_list.map((grocery, i) => (
                    <div key={i}>
                        <p> Name: {grocery.name}</p>
                        <p>Serving Size: {grocery.servings} People</p>
                        <ul>
                            { grocery.ingredients.length > 0 ? grocery.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>) : <li>Sorry no ingredients found</li>}
                        </ul>
                    </div>
            )) : <div></div> }
        </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    setCurrentSearch: (search) => dispatch(setCurrentSearch(search)),
    getUser: () => dispatch(getUser()),
    saveUser: (user) => dispatch(saveUser(user))
})

const mapStateToProps = (state) => ({
    user: state.user,
    search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(GroceryListPage);

