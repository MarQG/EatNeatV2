
const searchDefaultState = {
    query: '',
    filters: []
}

export default (state=searchDefaultState, action) => {
    switch(action.type){
        case "SET_SEARCH_FILTERS" :
            return {
                ...state,
                filters: action.filters
            }
        case "SET_QUERY":
            return {
                ...state,
                query: action.query
            }
        default: 
            return state;
    }
}