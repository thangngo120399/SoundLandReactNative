import axios from "axios";

const API_URL = "https://soulland.herokuapp.com/api/user/";

const createMemory = (formData) => {
  console.log(formData);
  return axios
    .post(API_URL + "creatememorial", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      alert(error);
    });
};

const updateMoreDataMemory = (moreData) => {
  console.log(moreData);
  return axios
    .put(API_URL + "saveplacetime", moreData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      alert(error);
    });
};
export default { createMemory, updateMoreDataMemory };
