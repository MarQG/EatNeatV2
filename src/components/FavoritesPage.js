import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser, saveUser } from "../actions/user";
import FavoriteCard from './FavoriteCard';
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
        
            const filteredFavs = favorites.filter(favorite => favorite.id != id);

            const updatedUser = {
                favorites: filteredFavs,
                user_id,
                recent_searches,
                my_week,
                grocery_list,
                _id
            }
    
            this.props.saveUser(updatedUser);
    }

    onHandleGroceryList = groceryItem => {
        console.log(groceryItem);
        const {
            favorites,
            user_id,
            recent_searches,
            my_week,
            grocery_list,
            _id
        } = this.props.user;
        
        grocery_list.push(groceryItem);

        const updatedUser = {
            favorites,
            user_id,
            recent_searches,
            my_week,
            grocery_list,
            _id
        } 

        


        console.log(updatedUser);
        this.props.saveUser(updatedUser);
    }

    render = () =>{
        return(    
            <div>
                {this.props.user.favorites.length > 0 ? this.props.user.favorites.map((favorite, i) => (
                    <div key={favorite.id} className="col-md-3">
                        <FavoriteCard recipe={favorite} onHandleFavorites={this.onHandleRemoveFavorite}/>
                    </div>
                    // <div key={favorites.id}>
                    //     <img src={favorites.image} onClick={() => this.onHandleDetailFavorites(favorites.id)} />
                    //     <div>Name: {favorites.name}</div>
                    //     <div>Serving: {favorites.numberOfServings}</div>
                    //     <div>Time To Make: {favorites.totalTime}</div>
                    //     <button onClick={() => this.onHandleRemoveFavorite(favorites.id)}> Remove from Favorites </button>
                    //     <button> Add to my week </button>
                    //     <button onClick={() => this.onHandleGroceryList({ name: favorites.name, servings: favorites.numberOfServings ,ingredients: favorites.ingredientLines })}> Add to grocery list </button>
                    // </div>
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

