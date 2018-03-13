import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser, saveUser } from "../actions/user";
import API from "../utils/api";
import SearchBar from './SearchBar';

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

    onHandleFavorites = (id, name, image, timeSeconds, attributes, rating) => {
        console.log(id)
        console.log(this.props.user)
        let currentFav = false;
    
        const {
            favorites,
            user_id,
            recent_searches,
            my_week,
            grocery_list,
            _id
        } = this.props.user;
    
        const newFav = { recipe_id: id, recipe_name: name, imageUrlBySize: image, totalTimeInSeconds: timeSeconds, attributes: attributes, rating: rating };

        
        if(!favorites.some(favorite => favorite.recipe_id === newFav.recipe_id)){
            favorites.push(newFav);
        } 
        // else if (favorites.some(favorite => favorite.recipe_id === newFav.recipe_id)) {
        //     favorites.filter()
        // }
        const updatedUser = {
            favorites,
            user_id,
            recent_searches,
            my_week,
            grocery_list,
            _id
        }

        this.props.saveUser(updatedUser);
    }


    render(){
        return(    
        <div>
            {this.props.search.search != "" ? this.props.search.matches.map(newRecipes => (
                <div key={newRecipes.attributes}>
                    <img src={newRecipes.imageUrlBySize["90"]} onClick={() => this.onHandleDetailFavorites(newRecipes.recipe_id)} />
                    <div>Name: {newRecipes.recipe_name}</div>
                    <div>Rating: {newRecipes.rating}</div>
                    <div>Time To Make: {newRecipes.totalTimeInSeconds / 60} minutes.</div>
                    <button id={newRecipes.recipe_id}  onClick={() => this.onHandleFavorites(newRecipes.recipe_id, newRecipes.recipe_name, newRecipes.imageUrlBySize, newRecipes.totalTimeInSeconds, newRecipes.attributes, newRecipes.rating)}>Add To Favs</button>
                </div>
            )) : <div></div> }
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