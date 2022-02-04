import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  NO_PROFILES,
  PROFILE_ERROR,
  DELETE_ACCOUNT,
} from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";

export const createSelfProfile = (formData) => async(dispatch) =>{
  const {name , about, photo}
}
export const getSelfProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
};
// export const getFollowerProfiles = () => async (dispatch) =>{

// }
