import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import VectorImg from "../../assets/icons/svg/VectImg.svg";
import { Toaster, toast } from "react-hot-toast";

function ImageSection({ edit, setEdit, userDetail }) {
   return (
      <>
      <Toaster/>
         <Box
            sx={{
               backgroundColor: "", // Background color
               height: "250px",
               display: "flex",
               flexDirection: "column",
            }}
         >
            <Box height="45%" sx={{ backgroundColor: "#BB3138" }}>
               <img
                  src={VectorImg}
                  alt="vector"
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
               />
            </Box>
            <Box
               height="55%"
               display="flex"
               justifyContent="center"
               alignItems="center"
               position="relative"
               flexDirection="column"
               backgroundColor="#fff"
            >
               <Box
                  sx={{
                     height: "100px",
                     width: "100px",
                     position: "absolute",
                     top: "-40%",
                     borderRadius: "50px",
                     objectFit: "cover",
                     display: "flex",
                     justifyContent: "center",
                  }}
               >
                  <Avatar sx={{ width: "100%", height: "100%" }} />
               </Box>
               <Typography fontSize="20px" fontWeight="500" mt={3}>
                  {userDetail?.firstName}
               </Typography>
               {edit ? (
                  <Typography
                     fontSize="16px"
                     fontWeight="500"
                     color="#BB3138"
                     onClick={() => toast.error("We are working on it")}
                  >
                     Save
                  </Typography>
               ) : (
                  <Typography
                     fontSize="16px"
                     fontWeight="500"
                     color="#BB3138"
                     onClick={() => setEdit((prev) => !prev)}
                  >
                     Edit
                  </Typography>
               )}
            </Box>
         </Box>
      </>
   );
}

export default ImageSection;
