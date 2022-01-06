import axios from 'axios';
import dotenv from "dotenv-defaults"
dotenv.config();

const instance = axios.create({
  baseURL: "english-vocab-learner.herokuapp.com",
});

/*
const instance = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 80}/`,
});
*/

export default instance;