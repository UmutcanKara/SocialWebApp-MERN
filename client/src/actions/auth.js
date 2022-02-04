import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    // dispatch(loadUser)
  } catch (err) {
    if (err) {
      setAlert("E-mail or password is not correct", "danger");
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  const { email, password } = formData;
  try {
    const res = await api.post("/auth", { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser);
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Email or password is incorrect", "danger"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
