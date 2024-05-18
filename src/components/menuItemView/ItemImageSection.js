import { Box } from "@mui/material";

import React from "react";


//image
import defaultItemImage from "../../assets/icons/svg/defaultMenuImage.svg";


// const ImgContainer = styled(Box)({
//    width: "400px",
//    height: "100%",
//    bgcolor: "white",
// });

function ItemImageSection({currentItem}) {

   return (
      <Box
         height="170px"
         bgcolor="white"
         width="100%"
         maxWidth= "400px"
         p={1}
         display="flex"
         justifyContent="center"
      >
         <Box width="100%">
            <img
               src={currentItem?.images?.[0]?.name||defaultItemImage}
               style={{ width: "100%", height: "100%", objectFit: "cover" }}
               alt="item"
            />
         </Box>
      </Box>
   );
}

export default ItemImageSection;
