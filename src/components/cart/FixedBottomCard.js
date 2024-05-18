import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function FixedBottomCard({ totalCartCount }) {
   const navigate = useNavigate();

   return (
      <Box
         sx={{
            width: "100%",
            height: "87px",
            bgcolor: "transparent",
            position: "fixed",
            bottom: 65,
         }}
      >
         <Box
            height="72px"
            margin="15px"
            bgcolor="#fff"
            sx={{
               borderRadius: "20px",
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               padding: "15px",
               boxShadow: "0px -2px 11px -4px rgba(0, 0, 0, 0.25)",
            }}
         >
            <Box>
               <Typography fontSize="16px" fontWeight="500" color="#BB3138">
                  {totalCartCount} Items Added
               </Typography>
            </Box>
            <Box>
               <Button
                  onClick={() => navigate("/cart")}
                  variant="contained"
                  sx={{
                     width: "80px",
                     height: "41px",
                     fontSize: "18px !important",
                     fontWeight: "500 !important",
                  }}
               >
                  Next
               </Button>
            </Box>
         </Box>
      </Box>
   );
}

export default FixedBottomCard;
