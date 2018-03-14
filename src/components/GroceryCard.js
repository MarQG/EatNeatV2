import React from 'react';


const GroceryCard = (props) => (
    <ul>
        <p> Name: {props.grocery.name}</p>
        <p>Serving Size: {props.grocery.servings} People</p>
        <ul>
            {props.grocery.ingredients.length > 0 ? props.grocery.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>) : <li>Sorry no ingredients found</li>}
        </ul>
    </ul>
)

export default GroceryCard;