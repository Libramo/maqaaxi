import axios from "axios";

export default axios.create({
  baseURL: "https://maqaaxi.herokuapp.com/api/v1/restaurants",
});
