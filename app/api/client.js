import axios from "axios";

export default axios.create({
    baseURL: "https://instagram-smart-crawler.herokuapp.com/api/auth/",
});