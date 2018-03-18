import React from 'react';
import API from '../utils/api';
import Modal from 'react-modal';

export default class FavoriteCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      weekModalOpen: false,
      recipe: {},
      daySelect: "Sunday",
      mealSelect: "Breakfast"
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
      backgroundColor: "#ECF0F1"
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
    if (name === "day") {
      this.setState({ daySelect: value });
    } else {
      this.setState({ mealSelect: value });
    }

  }


  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  closeWeekModal = () => {
    this.setState({ modalIsOpen: true, weekModalOpen: false });
  }

  onHandleMyWeek = id => {
    this.setState({ modalIsOpen: false, weekModalOpen: true })
  }

  onHandleSubmitToWeek = id => {
    let currentRecipe = this.state.recipe;
    this.setState({ modalIsOpen: false, weekModalOpen: false });

  }

  render(){
    return(
      <div className="example-2 card">
        {}
        <div className="wrapper">      
          <img src={this.props.recipe.images[0].hostedLargeUrl}/>
          <div className="header__card">
            <ul className="menu-content">
              <li><a id="faveBtn" onClick={() => this.props.onHandleFavorites(this.props.recipe.id)} className="fa fa-heart"></a></li>
              <li><a className="fa fa-clock-o"><span>{this.props.recipe.totalTime}</span></a></li>
              <li><a id="myWeekBtn" className="fa fa-calendar-plus-o"></a></li>

              {/* <li><a id="myWkBtn" onClick={() => this.props.onHandleMyWeek(this.props.recipe.id)} className="fa fa-calendar-plus"></a></li> */}
            </ul>
          </div>
          <div className="data">
            <div className="content">
              <span className="author"><a href={this.props.recipe.source.sourceRecipeUrl} target="_blank" >{this.props.recipe.source.sourceDisplayName}</a></span>
              <h1 className="title"><a href="#">{this.props.recipe.name}</a></h1>
              <a onClick={() => this.onHandleRecipePreview(this.props.recipe.id)} className="button__card">Preview Recipe</a>
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

                  <button className="button" onClick={this.closeModal}>close</button>
                </div>  

                  

              </Modal>

              <Modal isOpen={this.state.weekModalOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeWeekModal} ariaHideApp={false} style={this.customStyles} contentLabel="Example Modal">
                <div>
                  <select name="day" onChange={this.onChangeWeekSelect}>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thurday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                  <select name="meal" onChange={this.onChangeWeekSelect}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                  <button onClick={() => {
                    this.props.onHandleSubmitWeek(this.state.recipe, this.state.daySelect, this.state.mealSelect);
                    this.onHandleSubmitToWeek();
                  }}>Submit</button>
                  <button onClick={this.closeWeekModal}>Close</button>
                </div>
              </Modal>

            </div>
          </div>
        </div>
      </div>
    
    );
  } 
}