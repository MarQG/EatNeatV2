import React from 'react';


const GroceryCard = (props) => (
    <form class="todo-list">
            <h1 class="grocery=title"> {props.grocery.name}</h1>
            <p>Serving Size: {props.grocery.servings} People</p>
            
            <span class="todo-wrap">

            {props.grocery.ingredients.length > 0 ? props.grocery.ingredients.map((ingredient, i) => 
           
           <label class="todo" key={i}>
           {ingredient}</label>) : <li>Sorry no ingredients found</li>}
            
            </span>
        
    </form>
)

export default GroceryCard;