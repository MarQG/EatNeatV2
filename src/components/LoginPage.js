import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth.js';


export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <img className="box_layout__logo" src="./images/eat_neat_logo_wht.png" alt="EAT NEAT"/>
            <h1 className="box-layout__title">Let's Help Make Your Eating Neater.</h1>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) =>({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

