import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5005",
});

export default http;
