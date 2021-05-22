import axios from "axios";
// change url when deployed to heroku
const instance = axios.create({
  baseURL: "mongodb+srv://admin:paws12345@cluster0.nlzcv.mongodb.net/paws?retryWrites=true&w=majority",
});

export default instance;
