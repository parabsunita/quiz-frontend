import axios from "axios";

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/users/login", credentials);
    localStorage.setItem("token", data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    return true;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    return false;
  }
};

export const register = (userData) => async () => {
  try {
    await axios.post("http://localhost:5000/api/users/register", userData);
    return true;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    return false;
  }
};
