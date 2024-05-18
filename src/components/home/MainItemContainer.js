import { styled } from "@mui/material";
import React from "react";
import OfferSection from "./OfferSection";
import { Box } from "@mui/system";
import MenuListSection from "./MenuListSection";

const MainBox = styled(Box)({
   display: "flex",
   flexDirection: "column",
   position: "absolute",
   top: "90%",
   left: "0",
   width: "100%",
   maxWidth: 900,
   backgroundColor: "#fff",
   borderRadius: "15px 15px 0px 0px",
});

function MainItemContainer() {
   return (
      <MainBox>
         <OfferSection />
         <MenuListSection />
      </MainBox>
   );
}

export default MainItemContainer;
