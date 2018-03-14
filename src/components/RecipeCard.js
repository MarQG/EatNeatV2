import React from 'react';
import RecipeModal from './RecipeModal';
import API from '../utils/api';
import Modal from 'react-modal';

class RecipeCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
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

  wrapperStyles = {
    backgroundImage: 'url(' + this.props.recipe.imageUrlBySize[90] + ')',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

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

  render(){
    return(
      <div className="example-2 card">
        {}
        <div className="wrapper" style={this.wrapperStyles}>      
          <div className="header__card">
            <ul className="menu-content">
              <li><a id="faveBtn" onClick={() => this.props.onHandleFavorites(this.props.recipe.recipe_id)} className="fa fa-heart-o"></a></li>
              <li><a className="fa fa-clock-o"><span>{this.props.recipe.totalTimeInSeconds / 60} minutes</span></a></li>
              <li><a className="fa fa-users"><span>2-4</span></a></li>
            </ul>
          </div>
          <div className="data">
            <div className="content">
              <span className="author">Recipe Source Name</span>
              <h1 className="title"><a href="#">{this.props.recipe.recipe_name}</a></h1>
              <a onClick={() => this.onHandleRecipePreview(this.props.recipe.recipe_id)} className="button__card">Preview Recipe</a>
              <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                <div>
                  {this.state.recipe.name === undefined ? <img src="./images/loader.gif"/> : <div>
                    <h2>{this.state.recipe.name}</h2>
                    <img src={this.state.recipe.image} />
                    <div>Servings: {this.state.recipe.numberOfServings}</div>
                    <div>Total Time: {this.state.recipe.totalTime}</div>
                    <div>Source URL: {this.state.recipe.source.sourceRecipeUrl}</div>
                    <div>Ingredients: {this.state.recipe.ingredientLines}</div> 
                  </div>}
                  
                  <button onClick={this.closeModal}>close</button>
                </div>  
        
              </Modal>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default RecipeCard;