import React from 'react';
import Modal from 'react-modal';
import {toast} from 'react-toastify';

export default class MyWeekCard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        }
    }

    viewRecipe = recipe => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }


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
                                    <button 
                                        value={this.props.dayMeals.breakfast.id} 
                                        onClick={() => this.viewRecipe(this.props.dayMeals.breakfast)}
                                        >View Recipe</button>
                                <Modal inGrocery={
                                    this.props.grocery_list.some(
                                        item => item.id === this.props.dayMeals.breakfast.id)} isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                                    <div>
                                        {this.props.dayMeals.breakfast.name === undefined ? <img src="./images/loader.gif" /> : <div>
                                            <h2>{this.props.dayMeals.breakfast.name}</h2>
                                            <img src={this.props.dayMeals.breakfast.images[0].hostedLargeUrl} />
                                            <div>Servings: {this.props.dayMeals.breakfast.numberOfServings}</div>
                                            <div>Total Time: {this.props.dayMeals.breakfast.totalTime}</div>
                                            <div>Ingredients: {this.props.dayMeals.breakfast.ingredientLines.map((element, i) => (
                                                <div key={i}>{element}</div>
                                            ))}</div>
                                            {this.props.dayMeals.breakfast.instructions === null ? <div>Source URL: {this.props.dayMeals.breakfast.source.sourceRecipeUrl}</div> : <div>Instructions: {this.props.dayMeals.breakfast.instructions}</div>}
                                            <button onClick={() => this.props.onHandleToGrocery(this.props.dayMeals.breakfast)}>Add/Remove Grocery List Card</button>
                                        </div>}

                                        <button onClick={this.closeModal}>close</button>
                                    </div>

                                </Modal>     
                            </div> : <h4>Add a recipe to breakfast</h4>}
                        {this.props.dayMeals.lunch != undefined ?
                            <div>
                                Lunch
                                    {this.props.dayMeals.lunch.name}
                                <button value={this.props.dayMeals.lunch.id} onClick={() => this.viewRecipe(this.props.dayMeals.lunch)}>View Recipe</button>
                                <Modal inGrocery={
                                    this.props.grocery_list.some(
                                        item => item.id === this.props.dayMeals.lunch.id)} isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                                    <div>
                                        {this.props.dayMeals.lunch.name === undefined ? <img src="./images/loader.gif" /> : <div>
                                            <h2>{this.props.dayMeals.lunch.name}</h2>
                                            <img src={this.props.dayMeals.lunch.images[0].hostedLargeUrl} />
                                            <div>Servings: {this.props.dayMeals.lunch.numberOfServings}</div>
                                            <div>Total Time: {this.props.dayMeals.lunch.totalTime}</div>
                                            <div>Ingredients: {this.props.dayMeals.lunch.ingredientLines.map((element, i) => (
                                                <div key={i}>{element}</div>
                                            ))}</div>
                                            {this.props.dayMeals.lunch.instructions === null ? <div>Source URL: {this.props.dayMeals.lunch.source.sourceRecipeUrl}</div> : <div>Instructions: {this.props.dayMeals.lunch.instructions}</div>}

                                            <button onClick={() => this.props.onHandleToGrocery(this.props.dayMeals.lunch)}>Add/Remove Grocery List Card</button>
                                        </div>}


                                        <button onClick={this.closeModal}>close</button>
                                    </div>

                                </Modal>
                            </div> : <h4>Add a recipe to lunch</h4>}
                        {this.props.dayMeals.dinner != undefined ?
                            <div>
                                Dinner
                                    {this.props.dayMeals.dinner.name}
                                <button value={this.props.dayMeals.dinner.id} onClick={() =>this.viewRecipe(this.props.dayMeals.dinner)}>View Recipe</button>
                                <Modal inGrocery={
                                    this.props.grocery_list.some(
                                        item => item.id === this.props.dayMeals.dinner.id)} isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                                    <div>
                                        {this.props.dayMeals.dinner.name === undefined ? <img src="./images/loader.gif" /> : <div>
                                            <h2>{this.props.dayMeals.dinner.name}</h2>
                                            <img src={this.props.dayMeals.dinner.images[0].hostedLargeUrl} />
                                            <div>Servings: {this.props.dayMeals.dinner.numberOfServings}</div>
                                            <div>Total Time: {this.props.dayMeals.dinner.totalTime}</div>
                                            <div>Ingredients: {this.props.dayMeals.dinner.ingredientLines.map((element, i) => (
                                                <div key={i}>{element}</div>
                                            ))}</div>
                                            {this.props.dayMeals.dinner.instructions === null ? <div>Source URL: {this.props.dayMeals.dinner.source.sourceRecipeUrl}</div> : <div>Instructions: {this.props.dayMeals.dinner.instructions}</div>}

                                            <button onClick={() => this.props.onHandleToGrocery(this.props.dayMeals.dinner)}>Add/Remove Grocery List Card</button>
                                        </div>}


                                        <button onClick={this.closeModal}>close</button>
                                    </div>

                                </Modal> 
                            </div> : <h4>Add a recipe to dinner</h4>}
                    </div> : <div>Add something to your {this.props.day.toUpperCase()}!</div>}

                  
            </div>
        )
    }
}