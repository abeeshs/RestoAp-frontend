import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../config/axios";

// ----------------------------------------------------------------------

export const getUserDetails = createAsyncThunk(
   "user/getUserDetails",
   async () => {
      try {
         const userData = await API.get("/customers/user-detail");
         return userData.data;
      } catch (err) {
         console.log(err);
      }
   }
);

const initialState = {
   user: null,
   isAuthenticated: false,
   userDetail: null,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      userLoginSuccess(state, action) {
         state.isAuthenticated = true;
         state.user = action.payload;
      },
      userLoginFailure(state, action) {
         state.isAuthenticated = false;
         state.user = action.payload;
      },
      userLogout(state) {
         state.user = null;
         state.isAuthenticated = false;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getUserDetails.pending, (state) => {
            state.loading = true;
         })
         .addCase(getUserDetails.fulfilled, (state, action) => {
           
            state.userDetail = action.payload;
         })
         .addCase(getUserDetails.rejected, (state) => {
            state.loading = false;
            
          
         });
   },
});
export const { userLoginSuccess, userLoginFailure, userLogout } =
   userSlice.actions;
export default userSlice.reducer;

export function getUsers() {
   return async () => {
      try {
         await API.get("/customers/something");
       
      } catch (error) {
         console.error("error", error);
      }
   };
}
