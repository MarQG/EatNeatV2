
const defaultUserState = {
    userid: '',
    favorites: [],
    my_week: {
        monday: ''
    },
    recent_searches: [],
    grocery_list: []
}

export default (state = defaultUserState, action) => {
    switch(action.type){
        case "GET_USER":
            return {
                ...state,
                ...action.user
            }
        default:
            return state;
    }
}