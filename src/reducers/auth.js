export default (state = {}, action) => {
    switch(action.type) {
        case'LOGIN':
            return {
                uid: action.uid,
                username: action.username,
                userphoto: action.userphoto
            }
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};