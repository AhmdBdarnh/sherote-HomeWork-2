import axios from "axios";

const http = axios.create({
  baseURL: "https://sherote-homework-2.onrender.com/",
  headers: {
    "Content-type": "application/json",
  },
});
export default http;
