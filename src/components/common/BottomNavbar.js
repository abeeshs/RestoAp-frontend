import { Paper, styled } from "@mui/material";
import React from "react";

const CartCard = styled(Paper)({
   display: "flex",
   position: "fixed",
   height: "70px",
   justifyContent: "space-between",
   alignItems: "center",
   bottom: 0,
   left: 0,
   width: "100%",
   backgroundColor: "#fff",
   borderRadius:"0",
   padding: "0px 15px 0px 15px",
   zIndex: 2,
});

function BottomNavbar({ children }) {
   return <CartCard>{children}</CartCard>;
}

export default BottomNavbar;
