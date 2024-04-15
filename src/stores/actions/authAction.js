import { apiLoginSuccess, apiRegister } from "../../services/authService";
import actionType from "./actionType";
export const loginSuccessAction = (payload) => async (dispatch) => {
  try {
    let response = await apiLoginSuccess(payload);
    if (response.status === 200) {
      dispatch({
        typeLogin: "Success",
        type: actionType.LOGIN_SUCCESS,
        data: response.data,
      });
    } else {
      dispatch({
        type: actionType.LOGIN_SUCCESS,
        data: null,
        typeLogin: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.LOGIN_SUCCESS,
      data: null,
    });
  }
};
export const registerAction = (payload) => async (dispatch) => {
  try {
    console.log(payload);

    let response = await apiRegister(payload);
    if (response.status === 200) {
      dispatch({
        type: actionType.REGISTER,
        data: response.data,
      });
    } else {
      dispatch({
        type: actionType.REGISTER,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.REGISTER,
      data: null,
    });
  }
};
export const logout = () => ({
  type: actionType.LOGOUT,
});
