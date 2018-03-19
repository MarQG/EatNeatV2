import React from 'react';


const GroceryCard = (props) => (
    <div>
        <div className="todo-list">
                <h1 className="grocery-title"> {props.grocery.name}</h1>
                <p>Serving Size: {props.grocery.servings} People</p>
                
                <span className="todo-wrap">
                        
                {props.grocery.ingredients.length > 0 ? 
                    <div>
                        {props.grocery.ingredients.map((ingredient, i) =>
                    
                        <div  key={props.grocery.id + i}>
                        
                            <input type="checkbox" id={props.grocery.id + i}/>
                            <label htmlFor={props.grocery.id + i} className="todo">
                                <i className="fa fa-check"></i>
                                {ingredient}
                            </label>

                        </div>
                    
                    
                        )} 
                        
                            
                        </div> :
                   
                       
                    <li>Sorry no ingredients found</li>}
                </span>
                <button className="button__card--remove" onClick={() => props.onHandleToGrocery(props.grocery, true)}>Remove <span className="fa fa-times"></span></button>
        </div>
       
    </div>
    
)



export default GroceryCard;