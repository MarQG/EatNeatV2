import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { saveUser } from "../actions/user";
import GroceryCard from './GroceryCard';
import { toast } from 'react-toastify';


export class GroceryListPage extends React.Component {
    
    onHandleGroceryList = (recipe, inGrocery) => {
        const {
            favorites,
            user_id,
            recent_searches,
            my_week,
            grocery_list,
            _id
        } = this.props.user;

        const newList = {
            id: recipe.id,
            name: recipe.name,
            ingredients: recipe.ingredientLines,
            servings: recipe.numberOfServings
        }

        let filteredList = [];

        // grocery_list.push(newList)
        if (!inGrocery) {
            toast.info(`Added ${newList.name} to your Grocery List!`);
            grocery_list.push(newList);
        }
        else {
            toast.info(`Updated your Grocery List!`);
            filteredList = grocery_list.filter(grocery => grocery.id != newList.id);
        }

        const updatedUser = {
            favorites,
            user_id,
            recent_searches,
            my_week,
            grocery_list: inGrocery ? filteredList : grocery_list,
            _id
        }

        this.props.saveUser(updatedUser);
    }

    render(){
        return(
        <div className="container-fluid">
            <div className="content__header row text-center">
                <div className="col-sm-12">
                    <h2>{this.props.auth.username}'s Grocery List</h2>
                </div>
                
            </div>
            <div className="row">
                {this.props.user.grocery_list.length > 0 ? this.props.user.grocery_list.map((grocery, i)=> (
                    <div key={grocery.id} className="col-lg-4 col-md-6 col-sm-12">
                    <GroceryCard grocery={grocery} onHandleToGrocery={this.onHandleGroceryList} key={i} />
                    </div>
                ))  : <div className="col-sm-12 content__empty text-center">
                        <h2>Search for recipes to add to your Grocery List. Click <span><i className="fa fa-search" aria-hidden="true"></i></span> above get started.</h2>
                    </div> }
            </div>
        </div>   
        
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    saveUser: (user) => dispatch(saveUser(user))
})

const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(GroceryListPage);