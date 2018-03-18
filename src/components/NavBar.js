import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <div>
    <nav className="navbar navbar-default bootsnav">
        <div className="top-search">
            <div className="container">
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-search"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="Search"/>
                    <span className="input-group-addon close-search">
                        <i className="fa fa-times"></i>
                    </span>
                </div>
            </div>
        </div>
        <div className="container">
            {/* <!-- Start Atribute Navigation --> */}
            <div className="attr-nav">
                <ul>
                    <li className="search">
                        <a href="#">
                            <i className="fa fa-search"></i>
                        </a>
                    </li>
                    <li className="side-menu">
                        <a href="#">
                            <i className="fa fa-filter"></i>
                            <span>
                                Filter
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* <!-- End Atribute Navigation -->

            <!-- Start Header Navigation --> */}
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                    <i className="fa fa-bars"></i>
                </button>
                <a className="navbar-brand" href="#brand">
                    <img src="images/logo-purple2.png" className="logo" alt=""/>
                </a>
            </div>
            {/* <!-- End Header Navigation -->
            
            <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div className="collapse navbar-collapse" id="navbar-menu">
                <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                    <li className="active">
                        <a href="#">Why</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">FAQ</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                    <li> 
                        <a href="#">Profile</a>
                    </li>
                </ul>
            </div>
            {/* <!-- /.navbar-collapse --> */}
        </div>

        {/* <!-- Start Side Menu --> */}
        <div className="side">
            <a href="#" className="close-side">
                <i className="fa fa-times"></i>
            </a>
            <form>
				<div className="filter-block">
					<h4>Allergies</h4>

					<ul className="filter-content filters list">
						<li>
							<input className="filter" data-filter=".check1" type="checkbox" id="checkbox1"/>
			    			<label className="checkbox-label" for="checkbox1">Option 1</label>
						</li>

						<li>
							<input className="filter" data-filter=".check2" type="checkbox" id="checkbox2"/>
							<label className="checkbox-label" for="checkbox2">Option 2</label>
						</li>

						<li>
							<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
							<label className="checkbox-label" for="checkbox3">Option 3</label>
						</li>
						<li>
							<input class="filter" data-filter=".check1" type="checkbox" id="checkbox1"/>
			    			<label class="checkbox-label" for="checkbox1">Option 4</label>
						</li>

						<li>
							<input className="filter" data-filter=".check2" type="checkbox" id="checkbox2"/>
							<label className="checkbox-label" for="checkbox2">Option 5</label>
						</li>

						<li>
							<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
							<label className="checkbox-label" for="checkbox3">Option 6</label>
						</li>
						<li>
							<input className="filter" data-filter=".check1" type="checkbox" id="checkbox1"/>
			    			<label className="checkbox-label" for="checkbox1">Option 7</label>
						</li>

						<li>
							<input className="filter" data-filter=".check2" type="checkbox" id="checkbox2"/>
							<label className="checkbox-label" for="checkbox2">Option 8</label>
						</li>

						<li>
							<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
							<label className="checkbox-label" for="checkbox3">Option 9</label>
						</li>
						<li>
							<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
							<label className="checkbox-label" for="checkbox3">Option 10</label>
						</li>
					</ul>
				</div>

				<div className="filter-block">
					<h4>Diets</h4>

					<ul className="filter-content filters list">
						<li>
							<input className="filter" data-filter=".check1" type="checkbox" id="checkbox1"/>
			    			<label className="checkbox-label" for="checkbox1">Option 1</label>
						</li>

						<li>
							<input className="filter" data-filter=".check2" type="checkbox" id="checkbox2"/>
							<label className="checkbox-label" for="checkbox2">Option 2</label>
						</li>

						<li>
							<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
							<label className="checkbox-label" for="checkbox3">Option 3</label>
						</li>
						<li>
							<input className="filter" data-filter=".check1" type="checkbox" id="checkbox1"/>
			    			<label className="checkbox-label" for="checkbox1">Option 4</label>
						</li>

						<li>
							<input className="filter" data-filter=".check2" type="checkbox" id="checkbox2"/>
							<label className="checkbox-label" for="checkbox2">Option 5</label>
						</li>

						<li>
							<input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
							<label className="checkbox-label" for="checkbox3">Option 6</label>
						</li>
						
					</ul> 
				</div>
			</form>
        </div>
      
        
    </nav>
    <nav class="secondary-nav">
		<ul>
			<li><a className="active" href="#0">Favorites</a></li>
			<li><a href="#0">My Week</a></li>
			<li><a href="#0">Grocery List</a></li>
		</ul>
	</nav> 
    </div>










    //     {/* <ul className="navbar__list">
    //         <li><Link to="/dashboard" className="navbar__item">Dashboard Page</Link></li>
    //         <li><Link to="/search" className="navbar__item">Search Page</Link></li>     
    //         <li><Link to="/myweek" className="navbar__item">My Week Page</Link></li>     
    //         <li><Link to="/favorites" className="navbar__item">Favorites Recipes Page</Link></li>     
    //         <li><Link to="/grocerylist" className="navbar__item">Grocery List Page</Link></li>     
    //     </ul>
    // </nav> */}
);

export default NavBar;