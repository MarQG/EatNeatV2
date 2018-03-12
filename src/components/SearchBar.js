import React from 'react';
import API from '../utils/api.js';

export default class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            query: "",
            filters: {
                allergies: [],
                diet: []
            },
            error: '',
            newRecipes: [],
            userFavs: []
        }
    }
    onHandleQueryChange = (e) => {

        let newValue = e.target.value;
        this.setState({ query: newValue });
        
    }

    onHandleAllergyCheckedChange = (e) => {

        if(this.state.filters.allergies.indexOf(e.target.name) > -1){
            const filteredAllergies = this.state.filters.allergies.filter(allergy => allergy != e.target.name );
            this.setState( { filters: { ...this.state.filters, allergies: filteredAllergies }});
        } else {
            this.setState({ filters: { ...this.state.filters, allergies: [ ...this.state.filters.allergies, e.target.name ]}})
        }
        
    }

    onHandleDietCheckedChange = (e) => {

        if(this.state.filters.diet.indexOf(e.target.name) > -1){
            const filteredDiet = this.state.filters.diet.filter(diet => diet != e.target.name );
            this.setState( { filters: { ...this.state.filters, diet: filteredDiet }});
        } else {
            this.setState({ filters: { ...this.state.filters, diet: [ ...this.state.filters.diet, e.target.name ]}})
        }
        
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.query){
            this.setState({ error: "Please enter a search"});
        } else {
            this.setState({ error: ""});
            API.getRecipe(this.state).then((response) => {
                this.setState({ query: "" , newRecipes: response.data[0].matches});
            }).catch(err => {
                console.log(err);
            })
        }

       

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
                { this.state.error != "" ? <p>{this.state.error}</p> : <p></p> }
                <form onSubmit={this.onHandleSubmit}>
                   <label htmlFor="query">Search: </label>
                   <input onChange={this.onHandleQueryChange} name="query" type="text" value={this.state.query}/>
                   <div>
                        <p>Allergies</p>
                        <label htmlFor="gluten-free">Gluten Free</label>
                        <input type="checkbox" name="gluten-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="soy-free">Soy Free</label>
                        <input type="checkbox" name="soy-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="peanut-free">Peanut Free</label>
                        <input type="checkbox" name="peanut-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="dairy-free">Dairy Free</label>
                        <input type="checkbox" name="dairy-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="seafood-free">Seafood Free</label>
                        <input type="checkbox" name="seafood-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="sesame-free">Sesame Free</label>
                        <input type="checkbox" name="sesame-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="egg-free">Egg Free</label>
                        <input type="checkbox" name="egg-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="sulfite-free">Sulfite Free</label>
                        <input type="checkbox" name="sulfite-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="tree-nut-free">Tree Nut Free</label>
                        <input type="checkbox" name="tree-nut-free" onChange={this.onHandleAllergyCheckedChange}/>
                        <label htmlFor="wheat-free">Wheat Free</label>
                        <input type="checkbox" name="wheat-free" onChange={this.onHandleAllergyCheckedChange}/>
                   </div>
                    <div>
                        <p>Diet</p>
                        <label htmlFor="lacto-veg">Lacto Vegetarian</label>
                        <input type="checkbox" name="lacto-veg" onChange={this.onHandleDietCheckedChange}/>
                        <label htmlFor="ovo-veg">Ovo Vegetarian</label>
                        <input type="checkbox" name="ovo-veg" onChange={this.onHandleDietCheckedChange}/>
                        <label htmlFor="pescetarian">Pescetarian</label>
                        <input type="checkbox" name="pescetarian" onChange={this.onHandleDietCheckedChange}/>
                        <label htmlFor="vegan">Vegan</label>
                        <input type="checkbox" name="vegan" onChange={this.onHandleDietCheckedChange}/>
                        <label htmlFor="lacto-ovo-veg">Lacto-Ovo Vegetarian</label>
                        <input type="checkbox" name="lacto-ovo-veg" onChange={this.onHandleDietCheckedChange}/>
                        <label htmlFor="paleo">Paleo</label>
                        <input type="checkbox" name="paleo" onChange={this.onHandleDietCheckedChange}/>

                    </div>                   

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



