import { Box, Grid, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

//food image
import SearchBox from "../common/SearchBox";
import TodaySpecialCard from "./TodaySpecialCard";
import { useSelector } from "react-redux";

const SearchGrid = styled(Grid)({
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
});

const OfferContanerBox = styled(Box)({
   display: "flex",
   overflowX: "scroll",
   "& .MuiBox-root::-webkit-scrollbar": {
      display: "none",
   },
   height: "200px",
   padding: "5px",
});

function OfferSection() {
   // Get all menu items from redux store
   const { menuItems } = useSelector((state) => state.menu);
   console.log({menuItems});

   
   // Take out all items from category object
   const itemsFromAllCategory = menuItems?.flatMap((item) => item.items);

   console.log({itemsFromAllCategory});
   // Filter only fetured items from the all menu items
   const featuredItems = itemsFromAllCategory?.filter((item) => item.featured);

 

   const [searchTop, setsearchTop] = useState(false);

   //Scroll listening function
   const listenToScrol = () => {
      const searchScroll = 180;
      const scrol = window.scrollY;

      scrol >= searchScroll ? setsearchTop(true) : setsearchTop(false);
   };
   useEffect(() => {
      window.addEventListener("scroll", listenToScrol);
      return () => window.removeEventListener("scroll", listenToScrol);
   }, []);

   
   return (
      <>
         {searchTop && (
            <Box
               sx={{
                  position: "fixed",
                  top: "0",
                  zIndex: 1,
                  height: "60px",
                  bgcolor: "white",
                  width: "100%",
                  p: "15px",
               }}
            >
               <SearchGrid item xs={12}>
                  <SearchBox />
               </SearchGrid>
            </Box>
         )}

         <Box margin="10px 10px 0px 10px" padding="5px">
            <SearchGrid item xs={12}>
               <SearchBox />
            </SearchGrid>
            {featuredItems?.length > 0 && (
               <Box
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                  height="40px"
               >
                  <Typography fontSize="18px" fontWeight="fontWeightMedium">
                     Today Special
                  </Typography>
                  
               </Box>
            )}
         </Box>
         {featuredItems?.length > 0 && (
            <Box marginLeft="10px">
               <OfferContanerBox>
                  {featuredItems?.map((item) => (
                     <TodaySpecialCard key={item?.id} item={item} />
                  ))}
               </OfferContanerBox>
            </Box>
         )}
      </>
   );
}

export default OfferSection;
