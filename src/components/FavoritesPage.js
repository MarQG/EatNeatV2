import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser, saveUser } from "../actions/user";
import API from "../utils/api";

let loading = false;
export class FavoritesPage extends React.Component {
    
    onHandleDetailFavorites = id => {
        loading = true;
        API.getDetailRecipe(id).then(response => {
            
            console.log(response)
            loading = false;
        })
    }

    onHandleRemoveFavorite = id => {
        const {
            favorites,
            user_id,
            recent_searches,
            my_week,
            grocery_list,
            _id
        } = this.props.user;
        
            for (var i = 0; i < this.props.user.favorites.length; i++) {
                if (this.props.user.favorites[i].recipe_id === id) {
                    this.props.user.favorites.splice(i, 1)
                }
            }
            console.log(this.props.user)
            console.log(id)
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

    onHandleGroceryList = id => {
        loading = true;
        API.getDetailRecipe(id).then(response => {
            
            console.log(response.data.YummlyRecipe)
            loading = false;

            console.log(id)
            console.log(this.props.user)
            let currentGrocery = false;
        
            const {
                favorites,
                user_id,
                recent_searches,
                my_week,
                grocery_list,
                _id
            } = this.props.user;
        
            const newList = [response.data.YummlyRecipe.ingredientLines];

            
            grocery_list.push(newList)
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
        })
    }

    render(){
        return(    
        <div>
            {this.props.user.favorites.length > 0 ? this.props.user.favorites.map(favorites => (
                <div key={favorites.attributes}>
                    <img src={favorites.imageUrlBySize["90"]} onClick={() => this.onHandleDetailFavorites(favorites.recipe_id)} />
                    <div>Name: {favorites.recipe_name}</div>
                    <div>Rating: {favorites.rating}</div>
                    <div>Time To Make: {favorites.totalTimeInSeconds / 60} minutes.</div>
                    <button onClick={() => this.onHandleRemoveFavorite(favorites.recipe_id)}> Remove from Favorites </button>
                    <button> Add to my week </button>
                    <button onClick={() => this.onHandleGroceryList(favorites.recipe_id)}> Add to grocery list </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);

