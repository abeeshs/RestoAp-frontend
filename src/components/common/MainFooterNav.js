import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const FooterCard = styled(Paper)({
   display: "flex",
   position: "fixed",
   height: "55px",
   justifyContent: "space-between",
   alignItems: "center",
   bottom: 0,
   left: 0,
   width: "100%",
   backgroundColor: "#BB3138",
   padding: "5px 20px 5px",
   borderRadius: "20px 20px 0px 0px",
   zIndex: 1,
});

function MainFooterNav({isAuthenticated }) {
  
   const navigate = useNavigate();

 

   return (
      <>
         <FooterCard>
            <Grid container>
               <Grid item xs={4} display="flex" justifyContent="center">
                  <Box
                     display="flex"
                     flexDirection="column"
                     alignItems="center"
                     width="100%"
                  >
                     <HomeIcon
                        sx={{ color: "white", fontSize: "30px" }}
                        onClick={() => navigate("/")}
                     />
                     <Typography fontSize="12px" color="white">
                        Home
                     </Typography>
                  </Box>
               </Grid>
              
               <Grid item xs={4} display="flex" justifyContent="center">
                  <Box
                     display="flex"
                     flexDirection="column"
                     alignItems="center"
                     width="100%"
                  >
                     <LocalMallIcon
                        sx={{ color: "white", fontSize: "30px" }}
                        onClick={() => navigate("/order")}
                     />
                     <Typography fontSize="12px" color="white">
                        Orders
                     </Typography>
                  </Box>
               </Grid>
               <Grid
                  item
                  xs={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
               >
                  <Box
                     display="flex"
                     flexDirection="column"
                     alignItems="center"
                     width="100%"
                  >
                     {isAuthenticated ? (
                        <AccountCircleIcon
                           onClick={() => navigate("/profile")}
                           sx={{ color: "white", fontSize: "30px" }}
                        />
                     ) : (
                        <AccountCircleIcon
                           onClick={() => navigate("/auth/sign-in")}
                           sx={{ color: "white", fontSize: "30px" }}
                        />
                     )}

                     <Typography fontSize="12px" color="white">
                        {isAuthenticated ? "Profile" : "Login"}
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </FooterCard>
      </>
   );
}

export default MainFooterNav;
