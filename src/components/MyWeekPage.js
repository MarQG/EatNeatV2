import React from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../actions/user';
import MyWeekCard from './MyWeekCard';
import { toast } from 'react-toastify';


export class MyWeekPage extends React.Component {

    
    onHandleGroceryList = (recipe) => {

        let inGrocery = this.props.user.grocery_list.some(
            item => item.id === recipe.id);

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

    render(){
        return (
            <div className="container-fluid">
            <div className="content__header row text-center">
                    <div className="col-sm-12">
                        <h2>{this.props.auth.username}'s Weekly Meal Plan</h2>
                    </div>
                </div>
                <div className="row"> 
                    <MyWeekCard day={'monday'} dayMeals={this.props.user.my_week.monday} onHandleToGrocery={this.onHandleGroceryList} grocery_list={this.props.user.grocery_list}/>
                    <MyWeekCard day={'tuesday'} dayMeals={this.props.user.my_week.tuesday} onHandleToGrocery={this.onHandleGroceryList}  grocery_list={this.props.user.grocery_list}/>   
                    <MyWeekCard day={'wednesday'} dayMeals={this.props.user.my_week.wednesday} onHandleToGrocery={this.onHandleGroceryList} grocery_list={this.props.user.grocery_list}/>   
                    <MyWeekCard day={'thursday'} dayMeals={this.props.user.my_week.thursday} onHandleToGrocery={this.onHandleGroceryList} grocery_list={this.props.user.grocery_list}/>   
                    <MyWeekCard day={'friday'} dayMeals={this.props.user.my_week.friday} onHandleToGrocery={this.onHandleGroceryList} grocery_list={this.props.user.grocery_list}/>   
                    <MyWeekCard day={'saturday'} dayMeals={this.props.user.my_week.saturday} onHandleToGrocery={this.onHandleGroceryList} grocery_list={this.props.user.grocery_list}/>   
                    <MyWeekCard day={'sunday'} dayMeals={this.props.user.my_week.sunday} onHandleToGrocery={this.onHandleGroceryList} grocery_list={this.props.user.grocery_list}/>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    saveUser: (user) => dispatch(saveUser(user))
});

const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(MyWeekPage);  