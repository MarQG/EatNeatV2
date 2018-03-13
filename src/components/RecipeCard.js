import React from 'react';



export default class RecipeCard extends React.Component{
  constructor(props){
    super(props);
  }
  wrapperStyles ={
    backgroundImage: 'url(' + this.props.recipe.imageUrlBySize[90] + ')',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
  render(){
    return(
      <div className="col-md-3">
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
                <a href="#" className="button__card">Preview Recipe</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    );
  } 
}