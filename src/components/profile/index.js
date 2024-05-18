import React from "react";
import ImageSection from "./ImageSection";
import UserDetails from "./UserDetails";
import SignOutSection from "./SignOutSection";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

function Profile() {
   const [edit, setEdit] = useState(false);
   const {userDetail} = useSelector((state) => state.user);
  
   return (
      <Box bgcolor="#fff" height="100vh">
         <ImageSection edit={edit} setEdit={setEdit} userDetail={userDetail} />
         <UserDetails edit={edit} setEdit={setEdit} userDetail={userDetail}/>
         <SignOutSection />
      </Box>
   );
}

export default Profile;
