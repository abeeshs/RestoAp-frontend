import { Box } from "@mui/system";
import React from "react";

import vectorImg from "../../assets/icons/svg/VectorLogin.svg";
import Nostore from "../../assets/icons/png/Nostore.png";
import { Typography } from "@mui/material";
import Oops from "../../assets/icons/svg/Oops";

function EmptyStore() {
   return (
      <Box
         sx={{
            height: "100vh",
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${vectorImg})`,
            flexDirection: "column",
         }}
      >
         <Box height="300px" width="300px">
            <img src={Nostore} alt="store not available" />
         </Box>
         <Box
            width="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
         >
            <Oops sx={{ width: "300px", height: "45px" }} />
            <Typography color="#BB3138" fontSize="30px" fontWeight="500">
               {" "}
               Store Not Available
            </Typography>
            <Typography fontSize="14px" fontWeight="500" color="#BB3138">
               {" "}
               Please try after sometime
            </Typography>
         </Box>
      </Box>
   );
}

export default EmptyStore;
