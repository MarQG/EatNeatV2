
const searchDefaultState = {
    search: '',
    filters: [],
    matches: []
}

export default (state = searchDefaultState, action) => {
    switch(action.type){
        case 'SET_CURRENT_SEARCH':
            return action.search
        default: 
            return state;
    }
}