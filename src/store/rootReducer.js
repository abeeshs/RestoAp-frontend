import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/user";
import menuItemsReducer from "./slices/menuItems";
import cartReduser from "./slices/cart";
import restaurentReduser from "./slices/restaurentSlice";
// import productReducer from "./slices/product";
import orderReduser from "./slices/orders";
import orderTypeReducer from "./slices/orderType";
import currentOrderReducer from "./slices/currentOrders";
import showFooterReducer from "./slices/footer";

// ------------------------------------

export const rootPersistConfig = {
   key: "root",
   storage,
   keyPrefix: "redux-",
   user: [],
};

export const userPersistConfig = {
   key: "user",
   storage,
   keyPrefix: "redux-",
   user: {},
};

const rootReducer = combineReducers({
   //   product: productReducer,
   user: persistReducer(userPersistConfig, userReducer),
   menu: menuItemsReducer,
   cart: cartReduser,
   restaurent: restaurentReduser,
   orders: orderReduser,
   orderType: orderTypeReducer,
   currentOrder: currentOrderReducer,
   footer: showFooterReducer,
});

export default rootReducer;
