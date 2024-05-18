import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   showFooter: true,
};

const showFooterSlice = createSlice({
   name: "footer",
   initialState,
   reducers: {
      setShowFooter(state, action) {
         state.showFooter = action.payload;
      },
   },
});

export const { setShowFooter } = showFooterSlice.actions;
export default showFooterSlice.reducer;
