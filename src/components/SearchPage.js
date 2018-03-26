import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser, saveUser } from "../actions/user";
import API from "../utils/api";
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';
import { toast } from 'react-toastify';
import { css } from 'glamor';

// for loading detailed recipe if you want to put a loader GIF
let loading = false;

export class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filteredSearch: []
        }
    }

    componentDidMount = () => {
        const filteredSearch = this.props.search.matches.filter(match => {
            return (this.props.user.favorites.filter(favorite => favorite.id === match.recipe_id).length === 0);
        });
        this.setState({ filteredSearch: filteredSearch});
    }

    onHandleDetailFavorites = id => {
        loading = true;
        API.getDetailRecipe(id).then(response => {
            

            loading = false;
        })
    }

    onHandleFavorites = (id) => {

        API.getDetailRecipe(id).then(response => {


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

                favorites.push(newFav);
            } 
            else if (favorites.some(favorite => favorite.id === newFav.id)) {

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
            toast.info(`Added ${newFav.name} to your Recipe Book!`);
            this.props.saveUser(updatedUser);
            this.props.history.push("/search");        
        }).catch(err => {
            console.log(err);
        });
       
        
    }

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
            else{
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

    onHandleSubmitWeek = (recipe, day, mealTime) => {

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


    render(){
        return(
        <div className="container current-search text-center"> 
            {this.props.search.search != "" ? 
                <div className="row current-search__header">
                    <div className="col-sm-12">
                        <h2>Current Search: {this.props.search.search}</h2>
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Allergies</h3>
                                <ul className="list-group">
                                    {this.props.search.filters[0].allergies.length > 0 ? 
                                        this.props.search.filters[0].allergies.map(allergy => (
                                            <li key={allergy} className="list-group-item"><i className="fa fa-tag" aria-hidden="true"></i> {allergy}</li>
                                        )) 
                                    : <li>No Filters</li>
                                    }
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <h3>Diet</h3>
                                <ul className="list-group">
                                    {this.props.search.filters[0].diet.length > 0 ? 
                                        this.props.search.filters[0].diet.map(diet => (
                                            <li key={diet} className="list-group-item"><i class="fa fa-tag" aria-hidden="true"></i> {diet}</li>
                                        )) 
                                    : <li>No Filters</li>
                                    }
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div> 
                : false 
            } 
            <div className="row current-search__content">
                
                {this.state.filteredSearch.length > 0 ? 
                    this.state.filteredSearch.map(
                        match => 
                        <div key={match.recipe_id} className="col-md-3">
                            <RecipeCard 
                                recipe={match} 
                                onHandleFavorites={this.onHandleFavorites} 
                                onHandleToGrocery={this.onHandleGroceryList} 
                                inGrocery={
                                    this.props.user.grocery_list.some(
                                        item => item.id === match.recipe_id)}
                                onHandleSubmitWeek={this.onHandleSubmitWeek}
                            />
                            </div>) 
                            : 
                            this.props.search.search != "" ? 
                                <div className="col-sm-12">
                                    <h2>Sorry we couldn't find anything. Please try something else.</h2>
                                </div> 
                            : 
                                <div className="col-sm-12">
                                    <h2>Get started by clicking the <span><i className="fa fa-search" aria-hidden="true"></i></span> above.</h2>
                                </div>
                            }
            </div>
        </div>  
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveUser: (user) => dispatch(saveUser(user))
})

const mapStateToProps = (state) => ({
    user: state.user,
    search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);