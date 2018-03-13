import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser } from "../actions/user";

export class FavoritesPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            query: "",
            filters: {
                allergies: [],
                diet: []
            },
            error: ''
        }
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

