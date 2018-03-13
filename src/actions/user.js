import API from "../utils/api";

export const getUser = (user = {}) => ({
    type: "GET_USER",
    user
});


export const saveUser = (user = {}) => {
    return( dispatch, getState) => {
        const {
            user_id,
            favorites,
            my_week,
            grocery_list,
            recent_searches,
            _id
        } = user;

        const updatedUser = { user_id, favorites, my_week, grocery_list, recent_searches, _id };
        API.updateUser(updatedUser).then(response => {
            dispatch(getUser(response.data));
        }).catch(err => {
            console.log(err);
        });
    }
}