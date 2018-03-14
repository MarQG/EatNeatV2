import React from 'react';
import API from '../utils/api';
import Modal from 'react-modal';

export default class FavoriteCard extends React.Component{
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
    backgroundImage: 'url(' + this.props.recipe.image + ')',
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
              <li><a id="faveBtn" onClick={() => this.props.onHandleFavorites(this.props.recipe.id)} className="fa fa-heart"></a></li>
              <li><a className="fa fa-clock-o"><span>{this.props.recipe.totalTime}</span></a></li>
              <li><a className="fa fa-users"><span>2-4</span></a></li>
            </ul>
          </div>
          <div className="data">
            <div className="content">
              <span className="author">Recipe Source Name</span>
              <h1 className="title"><a href="#">{this.props.recipe.name}</a></h1>
              <a onClick={() => this.onHandleRecipePreview(this.props.recipe.id)} className="button__card">Preview Recipe</a>
              <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                <div>
                  {this.state.recipe.name === undefined ? <img src="./images/loader.gif"/> : <div>
                    <h2>{this.state.recipe.name}</h2>
                    <img src={this.state.recipe.image} />
                    <div>Servings: {this.state.recipe.numberOfServings}</div>
                    <div>Total Time: {this.state.recipe.totalTime}</div>
                    <div>Ingredients: {this.state.recipe.ingredientLines.map((element, i) => (
                      <div key={i}>{element}</div>
                    ))}</div>
                    {this.state.recipe.instructions === null ?<div>Source URL: {this.state.recipe.source.sourceRecipeUrl}</div> : <div>Instructions: {this.state.recipe.instructions}</div> }
                  </div>}
                  
                  <button onClick={this.closeModal}>close</button>
                </div>  
        
              </Modal>
              
            </div>
            <div className="data">
              <div className="content">
                <span className="author">Recipe Source Name</span>
                <h1 className="title"><a href="#">{this.props.recipe.recipe_name}</a></h1>
                <a href="#" className="button__card">Preview Recipe</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    );
  } 
}