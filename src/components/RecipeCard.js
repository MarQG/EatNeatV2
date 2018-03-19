import React from 'react';
import API from '../utils/api';
import Modal from 'react-modal';

export default class RecipeCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      weekModalOpen: false,
      recipe: {},
      daySelect: "monday",
      mealSelect: "breakfast"
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
      background: '#ECF0F1',
      height: '80%',
      overflow: "scroll"
    }
  };

  onHandleRecipePreview = id => {
    this.setState({ modalIsOpen: true });
    API.getDetailRecipe(id).then(response => {
      console.log(response)
      this.setState({  recipe: response.data });
    })
  }

  onChangeWeekSelect = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if(name === "day"){
      this.setState({ daySelect: value });
    } else {
      this.setState({ mealSelect: value});
    }
    
  }
  
  
  afterOpenModal =() => {
    // references are now sync'd and can be accessed.
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  closeWeekModal = () => {
    this.setState({ modalIsOpen: true, weekModalOpen: false });
  }

  onHandleMyWeek = id => {
    this.setState({ modalIsOpen: false, weekModalOpen: true})
  }

  onHandleSubmitToWeek = id => {
    let currentRecipe = this.state.recipe;
    this.setState({ modalIsOpen: false, weekModalOpen: false });
    
  }

  
 
  render(){
    return(
      <div className="example-2 card">
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
              <h4 className="title">{this.props.recipe.recipe_name}</h4>
              <a onClick={() => this.onHandleRecipePreview(this.props.recipe.recipe_id)} className="button__card">Preview Recipe</a>

              <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                <div>
                  <div className="row">
                      <div className="col-sm-11">
                        
                      </div>
                      <div className="col-sm-1">
                        <button className="button--close" onClick={this.closeModal}>Close <i className="fa fa-times" aria-hidden="true"></i></button>
                      </div>
                    </div>
                  {this.state.recipe.name === undefined ? <img src="./images/loader.gif"/> : 
                  <div className="row recipe-card">
                  <div className="col-md-6">
                    <h2>{this.state.recipe.name}</h2>
                    <img src={this.state.recipe.images[0].hostedLargeUrl} style={{width: "100%", padding: "0px 0px 20px" }}/>
                    <div className="row">
                    <div className="col-sm-4">
                        <button className="button" onClick={() => this.props.onHandleFavorites(this.props.recipe.recipe_id)}>Add/Remove From Recipe Book</button>
                      </div>
                      <div className="col-sm-4">
                        <button className="button" onClick={() => this.onHandleMyWeek()}>Add To Meal Plan</button>
                      </div>
                      <div className="col-sm-4">
                      {!this.props.inGrocery ? 
                        <button className="button" onClick={() => this.props.onHandleToGrocery(this.state.recipe, this.props.inGrocery)}>Add To Grocery List</button> 
                        : 
                      <button className="button" onClick={() => this.props.onHandleToGrocery(this.state.recipe, this.props.inGrocery)}>Remove From Grocery List</button>}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" >
                  <div>Servings: {this.state.recipe.numberOfServings}</div>
                    <div>Total Time: {this.state.recipe.totalTime}</div>
                    <h4>Ingredients: </h4>
                    <div style={{padding:"20px"}}>
                      
                      {this.state.recipe.ingredientLines.map((element, i) => (
                        <div key={i}>{element}</div>
                      ))}
                    </div>
                    {this.state.recipe.instructions === null ?<div><a href={this.state.recipe.source.sourceRecipeUrl} target="_blank">Click Here to View Recipe Instructions.</a></div> : <p>Instructions: {this.state.recipe.instructions}</p> }
                  </div>
                    

                                      
                  </div>}

                  
                </div>  

              </Modal>

              <Modal isOpen={this.state.weekModalOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeWeekModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
              <div className="meal-plan" style={{ width: "50vw"}}>
                  <div className="row text-center">
                    <div className="col-sm-10">

                    </div>
                    <div className="col-sm-2">
                      <button className="button--close" onClick={this.closeWeekModal}>Close <i className="fa fa-times"></i></button> 
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <h2>Add to Meal Plan</h2>
                      <div className="form-horizontal">
                        <div className="form-group row">
                          <label htmlFor="day" className="col-sm-3 control-label">Day of the Week:</label>
                          <div className="col-sm-9">
                            <select className="form-control" name="day" onChange={this.onChangeWeekSelect}>
                              <option value="monday">Monday</option>
                              <option value="tuesday">Tuesday</option>
                              <option value="wednesday">Wednesday</option>
                              <option value="thursday">Thurday</option>
                              <option value="friday">Friday</option>
                              <option value="saturday">Saturday</option>
                              <option value="sunday">Sunday</option>
                            </select>
                          </div>  
                          </div>
                          <div className="form-group row">
                            <label htmlFor="meal" className="col-sm-3 control-label">Meal of the Day: </label>
                            <div className="col-sm-9">
                              <select className="form-control" name="meal" onChange={this.onChangeWeekSelect}>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row">
                            
                            <div className="col-sm-4">
                              <button className="button" onClick={() => {
                                this.props.onHandleSubmitWeek(this.state.recipe, this.state.daySelect, this.state.mealSelect);
                                this.onHandleSubmitToWeek();
                              }}>Submit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </Modal>
              
            </div>
          </div>
        </div>
      </div>
    
    );
  } 
}