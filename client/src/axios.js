import axios from "axios";
// change url when deployed to heroku
const instance = axios.create({
  baseURL: "https://testpaws.herokuapp.com/",
});

export default instance;
