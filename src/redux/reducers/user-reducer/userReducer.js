import { LOGIN, REGISTER, SETUP } from "../../actions/actionType";

const INITIAL_STATE = {
  token: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
      };

    case REGISTER:
      return {
        ...state,
        token: action.payload,
      };
    case SETUP:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
