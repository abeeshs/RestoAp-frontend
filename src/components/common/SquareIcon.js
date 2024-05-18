import React from "react";
import LensIcon from "@mui/icons-material/Lens";
import { Box, styled } from "@mui/material";

const Square = styled(Box)({
   width: "20px",
   height: "20px",
   borderRadius: "5px",
   border: "1px solid #EE0F09",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
});

function SquareIcon({ icon }) {
   return (
      <Square>
         {icon === "triangle" ? (
            <svg
               width="11"
               height="9"
               viewBox="0 0 11 9"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path d="M5.5 0L10.2631 8.25H0.73686L5.5 0Z" fill="#EE0F09" />
            </svg>
         ) : (
            <LensIcon sx={{ fontSize: "10px", color: "green" }} />
         )}
      </Square>
   );
}

export default SquareIcon;
