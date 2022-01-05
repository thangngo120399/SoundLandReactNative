import axios from "axios";

const API_URL = "https://soulland.herokuapp.com/api/auth/";

const register = (values) => {
  return axios
    .post(API_URL + "signup", {
      ...values,
    })
    .then((response) => {
      alert('Registered successfully');
      return response;
    })
    .catch((error) => {
      console.log(error);
      alert(error);
      return;
    });
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
      alert("Error username or password!");
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
