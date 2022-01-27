import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      console.log("Dispatch fired");
      let newState = initialState;
      newState = [...newState, payload];
      console.log(newState);
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload.id);
    default:
      return state;
  }
};
export default alertReducer;
