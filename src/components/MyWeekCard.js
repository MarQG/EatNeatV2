import React from 'react';

export default class MyWeekCard extends React.Component{

    render(){
        return(
            <div>
                <h2>{this.props.day.toUpperCase()}</h2>
                {this.props.dayMeals != undefined ?
                    <div>
                        {this.props.dayMeals.breakfast != undefined ?
                            <div>
                                Breakfast
                                    {this.props.dayMeals.breakfast.name}
                            </div> : <h4>Add a recipe to breakfast</h4>}
                        {this.props.dayMeals.lunch != undefined ?
                            <div>
                                Lunch
                                    {this.props.dayMeals.lunch.name}
                            </div> : <h4>Add a recipe to lunch</h4>}
                        {this.props.dayMeals.dinner != undefined ?
                            <div>
                                Dinner
                                    {this.props.dayMeals.dinner.name}
                            </div> : <h4>Add a recipe to dinner</h4>}
                    </div> : <div>Add something to your {this.props.day.toUpperCase()}!</div>}
            </div>
        )
    }
}