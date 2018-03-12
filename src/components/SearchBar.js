import React from 'react';
import { connect } from 'react-redux';
import { setSearchFilters, setQuery } from '../actions/search';
import API from '../utils/api.js';

export class SearchBar extends React.Component {
    state = {
        search: {
            query: "",
            filters: []
        }
    }

    onHandleQueryChange = (e) => {

        let newValue = e.target.value;
        this.props.setQuery(newValue);
        this.setState({search: {query: newValue}})
        
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        API.getRecipe(this.state.search).then((response) => {
            console.log(response);
            this.setState({ search: { query: "" } })
        }).catch(err => {
            console.log(err);
        })

    }

    render(){
        return(
            <div>
                <form onSubmit={this.onHandleSubmit}>
                   <label htmlFor="query">Search: </label>
                   <input onChange={this.onHandleQueryChange} name="query" type="text"/>
                   <button type="submit">Search</button>
               </form>
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

