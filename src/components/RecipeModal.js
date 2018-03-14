import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default class RecipeModal extends Modal {
    constructor(props) {
        super(props);
    }
    render(){
        return(
          <div> 
            <h2>Biscuit</h2>
            <img src="#" />
            <button>close</button>
          </div>  
        )
    }
}