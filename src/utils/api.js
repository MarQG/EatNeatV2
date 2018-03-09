import axios from 'axios';

export default {
    getRecipe: (search) => {
        return axios.get("/api/search", search);
    },
    getUser: (uid) => {
        return axios.get("/api/user", uid);
    },
    updateUser: (uid, user) => {
        return axios.put("/api/user", { userid: uid, user: user} );
    }
}