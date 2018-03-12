import axios from 'axios';

export default {
    getRecipe: (search) => {
        console.log(search)
        return axios.post("/api/search", search);
    },
    getUser: (uid) => {
        return axios.post("/api/user", uid);
    },
    updateUser: (uid, user) => {
        return axios.put("/api/user", { userid: uid, user: user} );
    }
}