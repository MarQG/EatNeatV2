import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser, saveUser } from "../actions/user";
import FavoriteCard from './FavoriteCard';
import API from "../utils/api";
import { toast } from 'react-toastify';

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
        
        const filteredFavs = favorites.filter(favorite => {
            if(favorite.id === id){
                toast.info(`Removed ${favorite.name} from Favorites!`);
            }
            
            return favorite.id != id;
        });

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

    onHandleSubmitWeek = (recipe, day, mealTime) => {

        console.log(recipe);
        const {
            favorites,
            user_id,
            recent_searches,
            my_week,
            grocery_list,
            _id
        } = this.props.user;

        const updateWeek = {
            ...my_week,
            [day]: {
                ...my_week[day],
                [mealTime]: recipe
            }
        }

        toast.info(`Added ${recipe.name} to ${day.toUpperCase()} for ${mealTime.toUpperCase()}.`);
        const updatedUser = {
            favorites,
            user_id,
            recent_searches,
            my_week: updateWeek,
            grocery_list,
            _id
        }

        this.props.saveUser(updatedUser);
    }

    onHandleGroceryList = (recipe, inGrocery) => {
        console.log(recipe);

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

    render = () =>{
        return(
            <div className="container">
                <div className="row">
                    {this.props.user.favorites.length > 0 ? this.props.user.favorites.map((favorite, i) => (
                        <div key={favorite.id} className="col-lg-4 col-md-6 col-sm-12">
                            <FavoriteCard recipe={favorite}
                                onHandleFavorites={this.onHandleRemoveFavorite}
                                onHandleToGrocery={this.onHandleGroceryList}
                                inGrocery={
                                    this.props.user.grocery_list.some(
                                        item => item.id === favorite.id)}
                                onHandleSubmitWeek={this.onHandleSubmitWeek}/>
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

