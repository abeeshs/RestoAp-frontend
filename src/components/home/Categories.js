import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Categories({ categories, changeCategory,activeCategory }) {
   
   const handleClickCategory = (category) => {
      changeCategory(category);
      
   };
   return (
      <Box
         backgroundColor="#FFD4D4"
         height="50px"
         margin="10px 0px 0px 10px"
         sx={{
            borderRadius: "20px 0px 0px 20px",
            display: "flex",
            alignItems: "center",
            padding: "0px 15px 0px 20px",
            overflowX: "scroll",
         }}
      >
         <Box p="14px" display="flex" >
            <Typography
               onClick={() => handleClickCategory("all")}
               fontWeight="fontWeightMedium"
               fontSize="14px"
               color={activeCategory==="all"?"black":"#BB3138"}
               sx={{ whiteSpace: "nowrap", textTransform: "capitalize" }}
            >
               All Menu
            </Typography>
         </Box>
         {categories.map((cat) => (
            <Box p="14px" display="flex" key={cat}>
               <Typography
                  onClick={() => handleClickCategory(cat)}
                  fontWeight="fontWeightMedium"
                  fontSize="14px"
                  color={activeCategory===cat?"black":"#BB3138"}
                  sx={{ whiteSpace: "nowrap", textTransform: "capitalize" }}
               >
                  {cat}
               </Typography>
            </Box>
         ))}
      </Box>
   );
}

export default Categories;
