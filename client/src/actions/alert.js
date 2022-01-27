import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  console.log("setAlert fired");
  dispatch({ type: SET_ALERT, payload: { id, msg, alertType } });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: { id } }), 5000);
};
