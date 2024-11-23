import axios from "axios";

import { store } from "@/store/store";
import { showToaster } from "@/store/toaster/module";
import { logout } from "@/store/auth/module";

const request = axios.create({
  timeout: 1000 * 5
});

request.interceptors.request.use(
  (config) => {
    //  const user = store.getState().auth;

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method === "post" && config.data) {
      const urlEncodedData = new URLSearchParams();

      Object.keys(config.data).forEach((key) => {
        urlEncodedData.append(key, config.data[key]);
      });

      config.data = urlEncodedData;
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    return config;
  },
  (error) => {
    store.dispatch(
      showToaster({
        message: "Something went wrong, please try again.",
        severity: "error"
      })
    );
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        store.dispatch(logout());
        store.dispatch(
          showToaster({
            message: "Unauthorized access. Please log in again.",
            severity: "error"
          })
        );
      } else if (status === 503) {
        store.dispatch(
          showToaster({
            message: "Service unavailable. Please try again later.",
            severity: "error"
          })
        );
      } else {
        store.dispatch(
          showToaster({
            message: "An error occurred. Please try again.",
            severity: "error"
          })
        );
      }
    } else if (error.request) {
      store.dispatch(
        showToaster({
          message: "No response from server. Please check your internet connection.",
          severity: "error"
        })
      );
    } else {
      store.dispatch(
        showToaster({
          message: "Error: " + error.message,
          severity: "error"
        })
      );
    }
    return Promise.reject(error);
  }
);

export default request;
