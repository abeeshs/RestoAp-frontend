import React from "react";
import { Grid } from "@mui/material";
import HeaderSection from "./HeaderSection";
import FooterSection from "./FooterSection";
import SignInFormSection from "./SignInFormSection";
import VectorLogin from "../../assets/icons/svg/VectorLogin.svg"

const SignIn = () => {
   return (
      <div
         style={{
            display: "flex",
            backgroundColor:"#fff",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundImage: `url(${VectorLogin})`,
            backgroundPosition: "center",
         }}
      >
         <Grid
            container
            justifyContent="center"
            alignItems="center"
            maxWidth="500px"
         >
            <HeaderSection />
            <SignInFormSection />
            <FooterSection />
         </Grid>
      </div>
   );
};

export default SignIn;
