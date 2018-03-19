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

    customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            backgroundColor: "#ECF0F1",
            height: '80%',
            overflow: "scroll"
        }
      };

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
            <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="todo-list">

                
                <h2 className="day">{this.props.day.toUpperCase()}</h2>
                <hr /> 
                {this.props.dayMeals != undefined ?
                    <div className="todo-wrap">
                        {this.props.dayMeals.breakfast != undefined ?
                            <div className="todo-title" >
                                <p >BREAKFAST </p> 
                                <p className="sub-title">
                                    {this.props.dayMeals.breakfast.name} 
                                </p>
                                <button className="button__card" value={this.props.dayMeals.breakfast.id} onClick={() =>this.viewRecipe(this.props.dayMeals.breakfast)}>View Recipe</button>
                                <br />
                                <Modal inGrocery={
                                    this.props.grocery_list.some(
                                        item => item.id === this.props.dayMeals.breakfast.id)} 
                                    isOpen={this.state.modalIsOpen} 
                                    onAfterOpen={this.afterOpenModal} 
                                    onRequestClose={this.closeModal} ariaHideApp={false} 
                                    style={this.customStyles} 
                                    contentLabel="Example Modal">
                                    <div>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                
                                            
                                            </div>
                                            <div className="col-sm-2">
                                                <button className="button--close" onClick={this.closeModal}>Close <i className="fa fa-times"></i></button>
                                            </div>
                                        </div>
                                        {this.props.dayMeals.breakfast.name === undefined ? <img src="./images/loader.gif" /> : 
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h2>{this.props.dayMeals.breakfast.name}</h2>
                                                <img src={this.props.dayMeals.breakfast.images[0].hostedLargeUrl} style={{width: "100%", padding: "0px 0px 20px" }} />
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        
                                                        <button className="button" onClick={() => this.props.onHandleToGrocery(this.props.dayMeals.breakfast)}>Add/Remove Grocery List Card</button>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div>Servings: {this.props.dayMeals.breakfast.numberOfServings}</div>
                                                <div>Total Time: {this.props.dayMeals.breakfast.totalTime}</div>
                                                <h4>Ingredients:</h4>
                                                <div style={{ padding: "20px"}}> {this.props.dayMeals.breakfast.ingredientLines.map((element, i) => (
                                                    <div key={i}>{element}</div>
                                                ))}</div>
                                                {this.props.dayMeals.breakfast.instructions === null ? <div>Source URL: {this.props.dayMeals.breakfast.source.sourceRecipeUrl}</div> : <div>Instructions: {this.props.dayMeals.breakfast.instructions}</div>}
                                            </div>
                                            
                                            
                                        </div>}
                                        
                                        
                                    </div>

                                </Modal>     
                            </div> : 
                            
                            <div className="todo-title-empty">
                                <p >Add a Recipe from your Recipe Book to Breakfast</p>
                            </div>
                            }
                        {this.props.dayMeals.lunch != undefined ?
                            <div className="todo-title">
                                <p>LUNCH </p> 
                                <p className="sub-title">
                                    {this.props.dayMeals.lunch.name} 
                                </p>
                                <button className="button__card" value={this.props.dayMeals.lunch.id} onClick={() =>this.viewRecipe(this.props.dayMeals.lunch)}>View Recipe</button>
                                <br />
                                <Modal inGrocery={
                                    this.props.grocery_list.some(
                                        item => item.id === this.props.dayMeals.lunch.id)} isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                                        <div>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                
                                            
                                            </div>
                                            <div className="col-sm-2">
                                                <button className="button--close" onClick={this.closeModal}>Close <i className="fa fa-times"></i></button>
                                            </div>
                                        </div>    
                                        {this.props.dayMeals.lunch.name === undefined ? <img src="./images/loader.gif" /> : 
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h2>{this.props.dayMeals.lunch.name}</h2>
                                                <img src={this.props.dayMeals.lunch.images[0].hostedLargeUrl} style={{width: "100%", padding: "0px 0px 20px" }} />
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <button className="button" onClick={() => this.props.onHandleToGrocery(this.props.dayMeals.lunch)}>Add/Remove Grocery List Card</button>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div>Servings: {this.props.dayMeals.lunch.numberOfServings}</div>
                                                <div>Total Time: {this.props.dayMeals.lunch.totalTime}</div>
                                                <h4>Ingredients:</h4>
                                                <div style={{ padding: "20px"}}>Ingredients: {this.props.dayMeals.lunch.ingredientLines.map((element, i) => (
                                                    <div key={i}>{element}</div>
                                                ))}</div>
                                                {this.props.dayMeals.lunch.instructions === null ? <div>Source URL: {this.props.dayMeals.lunch.source.sourceRecipeUrl}</div> : <div>Instructions: {this.props.dayMeals.lunch.instructions}</div>}
                                            </div>
                                            
                                            
                                        </div>}
                                        
                                        
                                    </div>
                                </Modal>
                            </div> : 
                            <div className="todo-title-empty">
                                <p >Add a Recipe from your Recipe Book to Lunch</p>
                            </div>
                            }
                        {this.props.dayMeals.dinner != undefined ?
                            <div className="todo-title">
                                <div>
                                    <p>DINNER </p> 
                                    <p className="sub-title">
                                        {this.props.dayMeals.dinner.name} 
                                    </p>
                                    <button className="button__card" value={this.props.dayMeals.dinner.id} onClick={() =>this.viewRecipe(this.props.dayMeals.dinner)}>View Recipe</button>
                                    <br />
                                    <Modal inGrocery={
                                        this.props.grocery_list.some(
                                            item => item.id === this.props.dayMeals.dinner.id)} isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                                            <div>
                                            <div className="row">
                                            <div className="col-sm-10">
                                                
                                            
                                            </div>
                                            <div className="col-sm-2">
                                                <button className="button--close" onClick={this.closeModal}>Close <i className="fa fa-times"></i></button>
                                            </div>
                                        </div>
                                        {this.props.dayMeals.dinner.name === undefined ? <img src="./images/loader.gif" /> : 
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h2>{this.props.dayMeals.dinner.name}</h2>
                                                <img src={this.props.dayMeals.dinner.images[0].hostedLargeUrl} style={{width: "100%", padding: "0px 0px 20px" }} />
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <button className="button" onClick={() => this.props.onHandleToGrocery(this.props.dayMeals.dinner)}>Add/Remove Grocery List Card</button>
                                                    </div>
                                                    <div className="col-sm-6">
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div>Servings: {this.props.dayMeals.dinner.numberOfServings}</div>
                                                <div>Total Time: {this.props.dayMeals.dinner.totalTime}</div>
                                                <h4>Ingredients:</h4>
                                                <div style={{ padding: "20px"}}> {this.props.dayMeals.dinner.ingredientLines.map((element, i) => (
                                                    <div key={i}>{element}</div>
                                                ))}</div>
                                                {this.props.dayMeals.dinner.instructions === null ? <div>Source URL: <a href={this.props.dayMeals.dinner.source.sourceRecipeUrl} target="_blank">Click here to view detailed instructions</a></div> : <div>Instructions: {this.props.dayMeals.dinner.instructions}</div>}
                                            </div>
                                            
                                            
                                        </div>}
                                    </div>

                                    </Modal> 
                                </div>
                            </div> : 
                            <div className="todo-title-empty">
                                <p >Add a Recipe from your Recipe Book to Dinner</p>
                            </div>}
                    </div> : <div className="todo-title-empty">Add Recipe from your Recipe Book to your {this.props.day.toUpperCase()}!</div>}

                  </div>
            </div>
        )
    }
}