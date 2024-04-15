import axiosConfig from "../axios";
import axiosConfig1 from "../axios1";

export const apigetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/users/profile/",
        // headers: {
        //   authentication: token,
        // },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateUser = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/users/profile/",
        data,
        // headers: {
        //   authentication: token,
        // },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/user/get-all",
        // headers: {
        //   authorization: token,
        // },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateCart = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/user/cart",
        data,
        // headers: {
        //   authentication: token,
        // },
      });
      console.log(data);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiRemoveCart = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: "/user/remove-cart/" + pid,
        // headers: {
        //   authentication: token,
        // },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
