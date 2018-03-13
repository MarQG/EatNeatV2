import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser, saveUser } from "../actions/user";
import API from "../utils/api";
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';

// for loading detailed recipe if you want to put a loader GIF
let loading = false;

export class SearchPage extends React.Component {

    onHandleDetailFavorites = id => {
        loading = true;
        API.getDetailRecipe(id).then(response => {
            
            console.log(response)
            loading = false;
        })
    }

    onHandleFavorites = (id) => {
        console.log(id)
        console.log(this.props.user)
        let currentFav = false;
        API.getDetailRecipe(id).then(response => {
            console.log(response.data);

            const {
                favorites,
                user_id,
                recent_searches,
                my_week,
                grocery_list,
                _id
            } = this.props.user;

            const newFav = response.data;
            
            if(!favorites.some(favorite => favorite.id === newFav.id)){
                console.log("Saving a favorite");
                favorites.push(newFav);
            } 
            else if (favorites.some(favorite => favorite.id === newFav.id)) {
                console.log("Checing and removing a favorite");
                favorites.filter(favorite => favorite.id != newFav.id);
            }

            const updatedUser = {
                favorites,
                user_id,
                recent_searches,
                my_week,
                grocery_list,
                _id
            }
    
            this.props.saveUser(updatedUser);
        }).catch(err => {
            console.log(err);
        });
       
        
    }


    render(){
        return(    
        <div className="row">
            {this.props.search.search != "" ? this.props.search.matches.map((newRecipe,i) => (
                <div key={i} className="col-md-3">
                    <RecipeCard recipe={newRecipe} onHandleFavorites={this.onHandleFavorites}/>
                </div>
            )) : <div>Try Searching for Something</div> }
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentSearch: (search) => dispatch(setCurrentSearch(search)),
    getUser: () => dispatch(getUser()),
    saveUser: (user) => dispatch(saveUser(user))
})

const mapStateToProps = (state) => ({
    user: state.user,
    search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);