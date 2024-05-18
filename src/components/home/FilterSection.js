import React from "react";
import { Box, Chip, Grid, styled } from "@mui/material";
import SquareIcon from "../common/SquareIcon";
import SearchBox from "../common/SearchBox";

import CategoryIcon from "../../assets/icons/svg/CategoryIcon";

const SearchGrid = styled(Grid)({
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   paddingTop: "15px",
});

const SmallCard = styled(Chip)({
   height: "33px",
   minWidth: "40px",
   backgroundColor: "#fff",
   borderRadius: "8px",
   boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.10);",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   padding: "5px",
   marginRight: "15px",
   
   "& .MuiChip-label": {
      paddingLeft: "5px",
      paddingRight: "5px",
   },
   ":hover": {
      backgroundColor: "#fff",
   },
});

const FilterSection = ({ isTop, handleCategoryButton }) => {
   return (
      <>
         <Box
            maxWidth="900px"
            display="flex"
            height="150px"
            alignItems="center"
            backgroundColor="#fff"
            borderRadius="10px 10px 0px 0px"
            
         >
            <Grid container>
               <SearchGrid item xs={12}>
                  <SearchBox isTop={isTop} />
               </SearchGrid>
               <Grid
                  container
                  item
                  xs={12}
                  sx={{ padding: "15px" }}
                  spacing={1}
               >
                  <Grid item xs={8} sm={8} sx={{ display: "flex" }}>
                     <SmallCard
                        label="Veg"
                        icon={<SquareIcon icon="circle" color="green" />}
                     />
                     <SmallCard
                        label="Non-Veg"
                        icon={<SquareIcon icon="triangle" color="red" />}
                     />
                  </Grid>

                  <Grid
                     item
                     xs={4}
                     sm={4}
                     sx={{ display: "flex", justifyContent: "end" }}
                  >
                     <SmallCard
                        label=""
                        icon={<CategoryIcon />}
                        onClick={() => handleCategoryButton()}
                     />
                  </Grid>
               </Grid>
            </Grid>
         </Box>
      </>
   );
};

export default FilterSection;
