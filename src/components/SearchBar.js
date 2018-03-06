import React from 'react';
import { connect } from 'react-redux';
import { setSearchFilters, setQuery } from '../actions/search';

export class SearchBar extends React.Component {
    state = {
        search: {
            query: "",
            filters: []
        }
    }

    onQueryChange = (e) => {
        this.props.setQuery(e.target.value);
    }

    render(){
        return(
            <div>
               <form>
                   <label htmlFor="query">Search: </label>
                   <input onChange={this.onQueryChange} name="query" type="text"/>
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

