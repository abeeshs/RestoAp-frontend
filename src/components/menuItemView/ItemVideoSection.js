import { Box, styled } from "@mui/material";
import React from "react";


const VideoContainer = styled(Box)(({ theme }) => ({
   height: "100%",
   minHeight: "100%",
   width: "100%",
   [theme.breakpoints.up("sm")]: {
      width: "400px",
   },
}));
// const useStyles = Styled((theme) => ({
//    videoContainer: {
//       border: "1px solid grey",
//       height: "100%",
//       width: "300px",
//       [theme.breakpoints.up("sm")]: {
//          width: "400px",
//       },
//    },
//    video: {
//       objectFit: "cover",
//       width: "100%",
//       height: "100%",
//    },
// }));

function ItemVideoSection({ currentItem }) {
  
   return (
      <Box
         height="200px"
         width="100%"
         p={1}
         display="flex"
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
         mb="50px"
      >
         
         <VideoContainer>
            <video
               style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
               }}
               controls
               poster={currentItem?.images[0]?.name}
            >
               <source src={currentItem?.videos[0]?.name} type="video/mp4" />
            </video>
         </VideoContainer>
      </Box>
   );
}

export default ItemVideoSection;
