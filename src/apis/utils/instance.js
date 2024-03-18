import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("AccessToken")
  }
})


export default instance;