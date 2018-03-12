import React from 'react';
import { connect } from 'react-redux';
import { setSearchFilters, setQuery } from '../actions/search';
import API from '../utils/api.js';

export class SearchBar extends React.Component {
    state = {
        search: {
            query: "",
            filters: []
        },
        newRecipes: [],
        userFavs: []
    }

    onHandleQueryChange = (e) => {

        let newValue = e.target.value;
        this.props.setQuery(newValue);
        this.setState({search: {query: newValue}})
        
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        API.getRecipe(this.state.search).then((response) => {
            this.setState({newRecipes: response.data[0].matches})
            this.setState({ search: { query: "" } })
            console.log(this.state.newRecipes)
        }).catch(err => {
            console.log(err);
        })

    }

    onHandleFavorites = (id, name) => {
        console.log(id)
        let currentFav = false;
        for (let i = 0; i < this.state.userFavs.length; i++) {
            if (id === this.state.userFavs[i].recipe_id) {
                console.log("That item has already been favorited")
                currentFav = true;
            }
        }

        if (currentFav === false) {
            console.log("Adding to favs..")
            this.state.userFavs.push({recipe_id: id, recipe_name: name})
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onHandleSubmit}>
                   <label htmlFor="query">Search: </label>
                   <input onChange={this.onHandleQueryChange} name="query" type="text"/>
                   <button type="submit">Search</button>
               </form>
               {this.state.newRecipes.map(newRecipes => (
                   <div>
                        <img src={newRecipes.imageUrlBySize["90"]} href={"api/search/" + newRecipes.recipe_id}/>
                        <div>{newRecipes.recipe_name}</div>
                        <button id={newRecipes.recipe_id}  onClick={() => this.onHandleFavorites(newRecipes.recipe_id, newRecipes.recipe_name, newRecipes.imageUrlBySize, newRecipes.totalTimeInSeconds, newRecipes.attributes, newRecipes.rating)}>Add To Favs</button>
                   </div>
               )) }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    query: state.query,
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setQuery: (query) => dispatch(setQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

