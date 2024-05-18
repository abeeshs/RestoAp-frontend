import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   getStoreData,
   // setStoreIdSuccess,
   // setTableIdSuccess,
} from "../../store/slices/restaurentSlice";
import Home from "../../components/home";
import LandingPage from "../../components/home/LandingPage";
import { getAllMenu } from "../../store/slices/menuItems";
import { clearCartItems } from "../../store/slices/cart";
import EmptyStore from "../../components/home/EmptyStore";
import { setShowFooter } from "../../store/slices/footer";
import HomeSkeleton from "../../components/skeleton/HomeSkeleton";
import { setOrderType } from "../../store/slices/orderType";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorPage from "../../components/common/ErrorPage";

const HomePage = () => {
   // const [showTable, setShowTable] = useState(false); //state for show/hide choose table modal
   const [showSplash, setShowSplash] = useState(false); // State for show/hide flash screen
   const [showOption, setShowOption] = useState(false); //State for show/hide choose ordering type modal

   const [searchParams] = useSearchParams();
   const dispatch = useDispatch();
   const newStore = searchParams.get("store");
   const newTable = searchParams.get("table");

   // Get table id and store id form store
   const tableIdFromStore = useSelector((state) => state.restaurent?.tableId);
   const storeIdFromStore = useSelector((state) => state.restaurent?.storeId);
   // Get store details from redux store
   const { loading, storeDetails } = useSelector((state) => state.restaurent);

   useEffect(() => {
      /** If store id and table id is available in the url
       * fetch store details
       * Get all menu Items
       * Clear cart items
       */
      if (newStore && newTable) {
         dispatch(getStoreData({ storeId: newStore, tableId: newTable }));
         dispatch(getAllMenu(newStore));
         // If store id and table id is not awailable in the url , fetch store details using the store id from the redux
         // and fetch menu items
      } else if (
         !newStore &&
         !newTable &&
         storeIdFromStore &&
         tableIdFromStore
      ) {
         dispatch(
            getStoreData({
               storeId: storeIdFromStore,
               tableId: tableIdFromStore,
            })
         );
         dispatch(getAllMenu(storeIdFromStore));
      } else {
         window.location.href = "https://restoap.com/";
      }
   }, [newStore, newTable, storeIdFromStore, tableIdFromStore, dispatch]);

   useEffect(() => {
      //If storeid and table id is awailable in the url
      if (newStore && newTable) {
         dispatch(clearCartItems());
         //If takeaway option is awailabe in the store show option to choose order type else set default dining
         storeDetails?.isTakeawayAwailable
            ? setShowOption(true)
            : dispatch(setOrderType("dining"));

            
      }
      //If sote details is not awailable clear cart items and hide footer
      if (!storeDetails) {
         clearCartItems();
         dispatch(setShowFooter(false));
      } else {
         dispatch(setShowFooter(true));
      }
   }, [newStore, newTable, storeDetails, storeDetails, dispatch]);

   // If the store is not awailable or Qr order is false disable footer from the screen and clear cart items
   // useEffect(() => {
   //    if ((!loading && !storeDetails) || !storeDetails?.isQrOrderAwailable) {
   //       dispatch(clearCartItems());
   //       dispatch(setShowFooter(false));
   //    } else {
   //       dispatch(setShowFooter(true));
   //    }
   //    if (newStore && storeDetails?.isTakeawayAwailable) {
   //       setShowOption(true);
   //    } else {
   //       dispatch(setOrderType("dining"));
   //    }
   // }, [storeDetails, dispatch, newStore, dispatch]);

   //Check wheather the table id is available in the query or redux store
   // const table = newTable || tableIdFromStore;

   // //Check wheather the store id is available in the query or redux store
   // const store = newStore || storeIdFromStore;

   //If the current store id is differ from redux store id clear the cart,fetch menu item and show order type
   // useEffect(() => {
   //    if (newStore !== null && newStore !== storeIdFromStore) {
   //       dispatch(getStoreData(store, table));
   //       dispatch(clearCartItems());
   //       // dispatch(getAllMenu(store));
   //       setShowOption(true);
   //    }
   //    if (newTable && newTable !== tableIdFromStore) setShowOption(true);
   // }, [
   //    store,
   //    newStore,
   //    newTable,
   //    dispatch,
   //    storeIdFromStore,
   //    tableIdFromStore,
   // ]);

   // UseEffect for show splash screen if the app is launching first time
   useEffect(() => {
      const hasAppLaunchedBefore = localStorage.getItem("hasAppLaunched");

      if (!hasAppLaunchedBefore) {
         setShowSplash(true);
         localStorage.setItem("hasAppLaunched", true);

         // If showSplash is true, set a timeout to hide it after 2000 milliseconds
         setTimeout(() => setShowSplash(false), 2000);
      }
   }, []);

   // Function to clear cart every 30 minutes
   useEffect(() => {
      const interval = setInterval(() => {
         dispatch(clearCartItems());
      }, 300000);
      return () => clearInterval(interval);
   }, [dispatch]);

   if (!loading && !storeDetails) return <EmptyStore />;
   if (showSplash) return <LandingPage />;
   if (loading) return <HomeSkeleton />;

   return (
      <>
         <Home
            hasError={true}
            // showTable={showTable}
            showOption={showOption}
            setShowOption={setShowOption}
         />
      </>
   );
};

export default HomePage;
