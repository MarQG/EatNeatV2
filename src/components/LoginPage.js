import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin, startFacebookLogin } from '../actions/auth.js';


export const LoginPage = ({ startLogin, startFB }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <img className="box_layout__logo" src="./images/eat_neat_logo_wht.png" alt="EAT NEAT"/>
            <h1 className="box-layout__title">Welcome to EatNeat.</h1>
            <button className="button button--google" onClick={startLogin}> <span className="fa fa-google"></span> Sign In with Google</button>
            <button className="button button--facebook" onClick={startFB}> <span className="fa fa-facebook"></span> Sign In with Facebook</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) =>({
    startLogin: () => dispatch(startGoogleLogin()),
    startFB: () => dispatch(startFacebookLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

