import { LOGIN, REGISTER, SETUP } from "../actionType";
import request from "../../../axios/api";

const login = (username, password) => async (dispatch) => {
  let data = { username, password };
  try {
    let res = await request(`auth/token`, data, "post");
    let token = res.token;
    localStorage.setItem("netflix-token", token);
    // dispatch
    dispatch({
      type: LOGIN,
      payload: token,
    });
  } catch (e) {}
};

const register =
  (username, password, firstName, lastName, email) => async (dispatch) => {
    let data = { username, password, firstName, lastName, email };

    try {
      let res = await request(`auth/register`, data, "post");
      let token = res.token;
      localStorage.setItem("netflix-token", token);

      // dispatch
      dispatch({
        type: REGISTER,
        payload: token,
      });
    } catch (e) {}
  };

const setupToken = (token) => ({
  type: SETUP,
  payload: token,
});

export { login, register, setupToken };
