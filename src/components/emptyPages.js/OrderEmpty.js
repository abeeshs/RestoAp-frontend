import React from "react";
import { Box, Button, Typography } from "@mui/material";
import moduleName from "../../assets/icons/png/emptyOrder.png";
import { useNavigate } from "react-router-dom";
import VectorLogin from '../../assets/icons/svg/VectorLogin.svg'

function OrderEmpty() {
   const navigate = useNavigate();
   return (
      <Box
         height="100vh"
         bgcolor="#fff"
         display="flex"
         justifyContent="center"
         flexDirection="column"
         alignItems="center"
         sx={{backgroundImage:`url(${VectorLogin})`}}
      >
         <Box width="300px" height="272px" borderBottom="2px solid #BB3138">
            <img src={moduleName} alt="empty order" />
         </Box>
         <Box width="250px" height="250px" gap={2} textAlign="center" mt={2}>
            <Typography fontSize="30px" fontWeight="500" color="#BB3138">
               No Orders
            </Typography>
            <Typography fontSize="14px" fontWeight="500" color="#BB3138">
               Go find the items you like
            </Typography>
            <Button
               onClick={() => navigate("/")}
               sx={{
                  height: "40px",
                  width: "147px",
                  backgroundColor: "#BB3138",
                  color: "#fff",
                  fontSize: "16px !important",
                  fontWeight: "500",
                  marginTop: "20px",
               }}
            >
               Back to Menu
            </Button>
         </Box>
      </Box>
   );
}

export default OrderEmpty;
