import axios from 'axios';
import dotenv from "dotenv-defaults"
dotenv.config();

const instance = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 5000}/`,
});

export default instance;