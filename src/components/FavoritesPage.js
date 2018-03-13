import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser } from "../actions/user";
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
                grocery_list
            } = this.props.user;
        
            const newList = [response.data.YummlyRecipe.ingredientLines];

            
            grocery_list.push(newList)
            // else if (favorites.some(favorite => favorite.recipe_id === newFav.recipe_id)) {
            //     favorites.filter()
            // }
            this.props.getUser({
                favorites,
                user_id,
                recent_searches,
                my_week,
                grocery_list
            });
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
    getUser: () => dispatch(getUser())
})

const mapStateToProps = (state) => ({
    user: state.user,
    search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);

