import axios from "axios";

export default axios.create({
  baseURL: "https://maqaaxi.herokuapp.com/api/v1/restaurants",
  // baseURL: "http://localhost:3030/api/v1/restaurants",
});
