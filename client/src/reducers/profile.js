import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  NO_PROFILES,
  PROFILE_ERROR,
  DELETE_ACCOUNT,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  posts: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };

    case NO_PROFILES:
      return {
        ...state,
        profiles: [],
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };

    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        profile: null,
        profiles: [],
        posts: [],
        loading: true,
        error: {},
      };
    default:
      return state;
  }
};

export default profileReducer;
