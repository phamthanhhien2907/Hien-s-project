import axiosConfig from "../axios";
import axiosConfig1 from "../axios1";

export const apiRegister = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const response = await axiosConfig1({
        method: "POST",
        url: "/users/",
        data,
      });

      console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiLoginSuccess = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/jwt/create/",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
