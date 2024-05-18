import React from "react";
import SearchBox from "../common/SearchBox";
import { Box } from "@mui/material";
import { searchItems } from "../../api/SearchApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function SearchContainer({
   setSearchResult,
   searchText,
   setSearchText,
   setLoading,
}) {
   const storeId = useSelector((state) => state.restaurent.storeId);

   //Function to change the text
   const handleChange = (e) => {
      setSearchText(e.target.value);
   };

   //Created debounsing for search with useEffect
   useEffect(() => {
    
      //Api will call only the the search text >2 letter
      if (searchText.length < 2) return;

      //Timer function will call the search api if two letter typing gap is less than 200ms
      setLoading(true);
      const timerId = setTimeout(async () => {
         const result = await searchItems(storeId, searchText);
         setLoading(false);

         //Storing the result into state in the index page
         setSearchResult(result);
      }, 200);

      //Clearing the timer fuction
      return () => clearTimeout(timerId);
      // eslint-disable-next-line
   }, [searchText]);

   return (
      <Box
         sx={{
            backgroundColor: "#fff",
            p: "15px",
            position: "sticky",
            top: 0,
            left: "25%",
         }}
      >
         <SearchBox searchText={searchText} handleChange={handleChange} />
      </Box>
   );
}

export default SearchContainer;
