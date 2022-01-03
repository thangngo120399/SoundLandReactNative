import axios from "axios";

const API_URL = "https://instagram-smart-crawler.herokuapp.com/api/";

const getAll = () => {
    return axios.get(API_URL + "admin-management/users?page=0&size=15");
};

const login = (userInfo) => {
    return axios
        .post(API_URL + "login", {
            ...userInfo,
        })
        .then((response) => {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.token;
            return response;
        })
        .catch((error) => {
            alert("Login failed: " + error);
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    getAll,
    login,
    logout,
};