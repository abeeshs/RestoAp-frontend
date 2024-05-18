import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   orderType: "",
};

export const orderTypeSlice = createSlice({
   name: "orderType",
   initialState,
   reducers: {
      setOrderType(state, action) {
         state.orderType = action.payload;
      },
   },
});
export const { setOrderType } = orderTypeSlice.actions;
export default orderTypeSlice.reducer;
