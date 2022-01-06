import axios from 'axios';

const instance = axios.create({
  baseURL: "english-vocab-learner.herokuapp.com/api",
});

/*
const instance = axios.create({
  baseURL: `http://localhost:5000/api`,
});
*/

export default instance;