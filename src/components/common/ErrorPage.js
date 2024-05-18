import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ErrorIcon from "../../assets/icons/svg/Error";
import { useNavigate } from "react-router-dom";
function ErrorPage() {
   const navigate = useNavigate();
   return (
      <Box height="100vh" bgcolor="#F6C1C4" sx={{ zIndex: "9999px" }}>
         <Box
            height="50%"
            display="flex"
            justifyContent="center"
            alignItems="end"
         >
            <Box bgcolor="" height="200px" width="200px">
               <ErrorIcon
                  width="100px"
                  height="100px"
                  fontSize="13rem !important"
                  sx={{ fontSize: "13rem" }}
               />
            </Box>
         </Box>
         <Box
            height="50%"
            bgcolor=""
            display="flex"
            justifyContent="center"
            mt={5}
         >
            <Box
               height="70px"
               display="flex"
               flexDirection="column"
               alignItems="center"
               justifyContent="space-between"
            >
               <Typography> Page Not Found</Typography>
               <Button
                  variant="contained"
                  mt="50px"
                  width="140px"
                  sx={{ fontSize: "16px !important" }}
                  onClick={() => navigate("/")}
               >
                  HOME
               </Button>
            </Box>
         </Box>
      </Box>
   );
}

export default ErrorPage;
