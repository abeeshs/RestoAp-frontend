import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box } from "@mui/system";
import { styled } from "@mui/material";

const MainBox = styled(Box)({
   backgroundColor: "#FFD4D4",
   borderRadius: "50px",
   fontSize: "10px",
   padding: "5px",
   color: "#BB3138",
   height:"18px",
   width: "61px",
   fontWeight:"500",
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",
  
});

function PreperationTime({ time }) {
   return (
      <MainBox>
         <AccessTimeIcon fontSize="10px" /> {time} Min
      </MainBox>
   );
}

export default PreperationTime;
