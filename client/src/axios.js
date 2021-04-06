import axios from "axios";
// change url when deployed to heroku
const instance = axios.create({
  baseURL: "http://localhost:3001",
});

export default instance;
