import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase.js';

export const login = (uid, username, userphoto) => ({
    type: 'LOGIN',
    uid,
    username,
    userphoto
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const startGoogleLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startFacebookLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(facebookAuthProvider)
    }
}

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};