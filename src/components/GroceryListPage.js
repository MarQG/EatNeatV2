import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSearch } from '../actions/search';
import { getUser } from "../actions/user";


export class GroceryListPage extends React.Component {

    render(){
        return(    
        <div>
            {this.props.user.grocery_list.length > 0 ? this.props.user.grocery_list.map(grocery => (
                <div>
                    <div>{grocery[0]}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroceryListPage);

