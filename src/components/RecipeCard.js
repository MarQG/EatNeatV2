import React from 'react';
import API from '../utils/api';
import Modal from 'react-modal';

export default class RecipeCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      weekModalOpen: false,
      recipe: {}
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
      color: 'black'
    }
  };

  onHandleRecipePreview = id => {
    this.setState({ modalIsOpen: true });
    API.getDetailRecipe(id).then(response => {
      console.log(response)
      this.setState({  recipe: response.data });
    })
  }
  
  
  afterOpenModal =() => {
    // references are now sync'd and can be accessed.
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  closeWeekModal = () => {
    this.setState({ weekModalOpen: false });
  }
 
  render(){
    return(
      <div className="example-2 card">
        {}
        <div className="wrapper"> 
          <img src={this.props.recipe.imageUrlBySize[90]}/>     
          <div className="header__card">
            <ul className="menu-content">
              <li><a id="faveBtn" onClick={() => this.props.onHandleFavorites(this.props.recipe.recipe_id)} className="fa fa-heart-o"></a></li>
              <li><a className="fa fa-clock-o"><span>{this.props.recipe.totalTimeInSeconds / 60} min</span></a></li>
              <li><a className="fa fa-star"><span>{this.props.recipe.rating}</span></a></li>
            </ul>
          </div>
          <div className="data">
            <div className="content">
              {/* <span className="author">information powered by <img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></span> */}
              <h1 className="title">{this.props.recipe.recipe_name}</h1>
              <a onClick={() => this.onHandleRecipePreview(this.props.recipe.recipe_id)} className="button__card">Preview Recipe</a>
              <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                <div>
                  {this.state.recipe.name === undefined ? <img src="./images/loader.gif"/> : 
                  <div className="row">
                  <div className="col-md-6">
                    <h2>{this.state.recipe.name}</h2>
                    <img src={this.state.recipe.image} style={{width: "100%", height: "max-content", padding: "0px 0px 20px" }}/>
                  </div>
                  <div className="col-md-6">
                  <div>Servings: {this.state.recipe.numberOfServings}</div>
                    <div>Total Time: {this.state.recipe.totalTime}</div>
                    <h4>Ingredients: </h4>
                    <div style={{padding:"20px"}}>
                      
                      {this.state.recipe.ingredientLines.map((element, i) => (
                        <div key={i}>{element}</div>
                      ))}
                    </div>
                    {this.state.recipe.instructions === null ?<div>Source URL: {this.state.recipe.source.sourceRecipeUrl}</div> : <div>Instructions: {this.state.recipe.instructions}</div> }   
                  </div>
                  <button className="button" onClick={() => this.props.onHandleAddToWeek(this.props.recipe.recipe_id)}>Add To Week</button>
                    {!this.props.inGrocery ? 
                      <button className="button" onClick={() => this.props.onHandleToGrocery(this.state.recipe, this.props.inGrocery)}>Add To Grocery List</button> 
                      : 
                      <button className="button" onClick={() => this.props.onHandleToGrocery(this.state.recipe, this.props.inGrocery)}>Remove From Grocery List</button>}
                  </div>}
                  <button className="button" onClick={this.closeModal}>Close</button>
                </div>  
              </Modal>
              
            </div>
          </div>
        </div>
      </div>
    
    );
  } 
}