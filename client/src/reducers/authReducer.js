import {
  SET_CURRENT_USER,
  USER_LOADING,
  USER_ADMIN,
  RESET_USER_ADMIN,
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case USER_ADMIN:
      return {
        ...state,
        isAdmin: true,
        user: action.payload
      };
    case RESET_USER_ADMIN:
      return {
        ...state,
        isAdmin: false,
        user: action.payload
      };
    default:
      return state;
  }
}