import axios from "axios";
import { auth } from "./firebase";
// import { store } from "../store";
// import { clearUser } from "../reducers/authReducer";

const API = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
});

// API.interceptors.request.use(
//   (config) => {
//     let token;
//     console.log("token", token);
//     auth.onAuthStateChanged((userCred) => {
//       console.log("AUTH STATE CHANGED");
//       if (userCred) {
//         window.localStorage.setItem("auth", "true");
//         userCred.getIdToken().then((res) => {
//           localStorage.setItem("accessToken", `Bearer ${res}`);

//           token = localStorage.getItem("accessToken");
//           console.log("ACCESS TOKEN FROM LOCAL STORAGE", token);
//         });
//       }
//     });

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log(
//         "Authorization",
//         (config.headers["Authorization"] = `Bearer ${token}`)
//       );
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

API.interceptors.request.use(
   async (config) => {
      try {
         const userCred = await new Promise((resolve, reject) => {
            auth.onAuthStateChanged((user) => {
               resolve(user);
            }, reject);
         });

         if (userCred) {
            window.localStorage.setItem("auth", "true");
            const res = await userCred.getIdToken();
            const token = `Bearer ${res}`;

            localStorage.setItem("accessToken", token);
            config.headers.Authorization = token;
         }
      } catch (error) {
         console.error(error);
      }

      return config;
   },
   (error) => Promise.reject(error)
);

API.interceptors.response.use(
   (response) => response,
   (error) => {
      console.log(error.response);
      if (error.response && error.response.status === 401) {
         // Clear the user and token from the Redux store
         localStorage.removeItem("user");
         localStorage.removeItem("isAuthorized");

         // Redirect to the login page or perform any other necessary actions
         window.location.href = "/";
      }
      return Promise.reject(
         (error.response && error.response.data) || "Something went wrong"
      );
   }
);

export default API;
