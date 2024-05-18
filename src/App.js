import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
// import { getUsers } from "./store/slices/user";
import AppRoute from "./routes";
// import axios from "axios";
// import { auth } from "./config/firebase";
import { useMediaQuery } from "@mui/material";
// import MainFooterNav from "./components/common/MainFooterNav"
import BigScreen from "./components/common/BigScreen";
import LoadingPage from "./components/common/LoadingPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./store/slices/user";

function App() {
   const dispatch = useDispatch();
   const matches = useMediaQuery("(min-width:620px)");

   // const newStore = searchParams.get("store");
   const { isAuthenticated } = useSelector((state) => state.user);

   useEffect(() => {
      if (isAuthenticated) {
         dispatch(getUserDetails());
      }
   }, [dispatch, isAuthenticated]);

   if (matches) return <BigScreen />;

   return (
      <>
         <Suspense fallback={<LoadingPage />}>
            <RouterProvider router={AppRoute} />
         </Suspense>
      </>
   );
}

export default App;
