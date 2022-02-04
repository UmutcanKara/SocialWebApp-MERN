import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    //Add token to LocalStorage
    localStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    //Delete token from LocalStorage
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
