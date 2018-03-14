import axios from 'axios';

export default {
    getRecipe: (search) => {
        console.log(search)
        return axios.post("/api/search", search);
    },
    getDetailRecipe: (id) => {
        console.log(id)
        return axios.get("/api/search/" + id);
    },
    getUser: (uid) => {
        return axios.post("/api/user", uid);
    },
    updateUser: (user) => {
        return axios.put("/api/user", { user: user} );
    }
}