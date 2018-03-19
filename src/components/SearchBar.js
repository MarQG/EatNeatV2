import React from 'react';
import API from '../utils/api.js';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser } from "../actions/user"
import SearchPage from "./SearchPage"
import FavoritesPage from "./FavoritesPage"
import GroceryListPage from "./GroceryListPage"

export class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            query: "",
            filters: {
                allergies: [],
                diet: []
            },
            error: '',
            showFilters: false
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
                console.log(response)
                this.setState({ query: "" });
                this.props.setCurrentSearch(response.data);
                this.props.history.push("/search");
            }).catch(err => {
                console.log(err);
            })
        }
    }

    onHandleToggleFilters = (e) => {
        e.preventDefault();
        this.setState({ showFilters: !this.state.showFilters });
    }

    

    render(){
        return(
            <div className="searchbar container-fluid">
                <div className="container">

                
                <form className="form" onSubmit={this.onHandleSubmit}>
                    <div className="form-group">
                            <input className="" placeholder="Search For Recipes..." onChange={this.onHandleQueryChange} name="query" type="text" value={this.state.query}/>
                            <button className="button button--search" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                            <button className="button button--search" onClick={this.onHandleToggleFilters}><i className="fa fa-filter" aria-hidden="true" ></i> Filter</button>
                            <button className="button button--search" onClick={this.props.onHandleCloseSearchBar}><i className="fa fa-times" aria-hidden="true"></i></button>
                            
                    </div>
                    { this.state.error != "" ? <p className="search--error">{this.state.error}</p> : false }
                    { this.state.showFilters ? 
                    <div className="searchbar--filters">
                        <div className="row">
                            <div className="col-sm-6">
                                <h4>Allergies</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <ul>
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="gluten-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="gluten-free">Gluten Free</label>
                                                    </div>
                                                </div>                                    
                                            </li>
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                <input type="checkbox" name="soy-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="soy-free">Soy Free</label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="peanut-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="peanut-free">Peanut Free</label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="dairy-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="dairy-free">Dairy Free</label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="seafood-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="seafood-free">Seafood Free</label>
                                                    </div>
                                                </div>
                                            </li> 
                                        </ul>
                                    </div>

                                    <div className="col-lg-6">
                                        <ul>
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="sesame-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="sesame-free">Sesame Free</label>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="egg-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="egg-free">Egg Free</label>
                                                    </div>
                                                </div>
                                            </li> 
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="sulfite-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="sulfite-free">Sulfite Free</label>
                                                    </div>
                                                </div>
                                            </li> 
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="tree-nut-free" onChange={this.onHandleAllergyCheckedChange}/>
                                                    <div className="state p-success">
                                                        <label htmlFor="tree-nut-free">Tree Nut Free</label>
                                                    </div>
                                                </div>
                                            </li> 
                                            <li>
                                                <div className="pretty p-switch p-fill">
                                                    <input type="checkbox" name="wheat-free" onChange={this.onHandleAllergyCheckedChange}/> 
                                                    <div className="state p-success">
                                                        <label htmlFor="wheat-free">Wheat Free</label>
                                                    </div>
                                                </div>
                                            </li>   
                                        </ul>
                                    </div>
                                </div>
                                
                                

                               
                            </div>
                            <div className="col-sm-6">
                                <h4>Diet</h4>
                                <ul>
                                    <li>
                                        <div className="pretty p-switch p-fill">
                                            <input type="checkbox" name="lacto-veg" onChange={this.onHandleDietCheckedChange}/>
                                            <div className="state p-success">
                                                <label htmlFor="lacto-veg">Lacto Vegetarian</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="pretty p-switch p-fill">
                                            <input type="checkbox" name="ovo-veg" onChange={this.onHandleDietCheckedChange}/>
                                            <div className="state p-success">
                                                <label htmlFor="ovo-veg">Ovo Vegetarian</label>
                                            </div>
                                        </div>
                                    </li> 
                                    <li>
                                        <div className="pretty p-switch p-fill">
                                            <input type="checkbox" name="pescetarian" onChange={this.onHandleDietCheckedChange}/>
                                            <div className="state p-success">
                                                <label htmlFor="pescetarian">Pescetarian</label>
                                            </div>
                                        </div>
                                    </li> 
                                    <li>
                                        <div className="pretty p-switch p-fill">
                                            <input type="checkbox" name="vegan" onChange={this.onHandleDietCheckedChange}/>
                                            <div className="state p-success">
                                                <label htmlFor="vegan">Vegan</label>
                                            </div>
                                        </div>
                                    </li> 
                                    <li>
                                        <div className="pretty p-switch p-fill">
                                            <input type="checkbox" name="lacto-ovo-veg" onChange={this.onHandleDietCheckedChange}/>
                                            <div className="state p-success">
                                                <label htmlFor="lacto-ovo-veg">Lacto-Ovo Vegetarian</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="pretty p-switch p-fill">
                                            <input type="checkbox" name="paleo" onChange={this.onHandleDietCheckedChange}/>
                                            <div className="state p-success">
                                                <label htmlFor="paleo">Paleo</label>
                                            </div>
                                        </div>
                                    </li>    
                                </ul>
                                <div className="form-group">
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    

                                </div>
                            </div>
                        </div>
                        
                        
                        
                    </div>
                         : false }
                                      

                   
               </form> 
               
               </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    setCurrentSearch: (search) => dispatch(setCurrentSearch(search)),
    getUser: () => dispatch(getUser())
})

const mapStateToProps = (state) => ({
    user: state.user,
    search: state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


