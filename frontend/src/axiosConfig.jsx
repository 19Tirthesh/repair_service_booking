import axios from "axios";

const API = axios.create({
  baseURL: "http://3.107.177.44:3333"
});

export default API;