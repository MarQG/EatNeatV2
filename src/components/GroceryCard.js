import React from 'react';


const GroceryCard = (props) => (
    <form className="todo-list">
            <h1 className="grocery-title"> {props.grocery.name}</h1>
            <p>Serving Size: {props.grocery.servings} People</p>
            
            <span className="todo-wrap">
            {props.grocery.ingredients.length > 0 ? 
                props.grocery.ingredients.map(
                    (ingredient, i) =>
                    <div  key={i}>
                        <input type="checkbox" id={i}/>
                        <label htmlFor={i} className="todo">
                            <i className="fa fa-check"></i>
                            {ingredient}
                        </label>
                    </div>
                    
                        ) : 
                <li>Sorry no ingredients found</li>}
            </span>
        
    </form>
)

export default GroceryCard;