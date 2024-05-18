import React from "react";
import SearchContainer from "./SearchContainer";
import SearchResultContainer from "./SearchResultContainer";
import { Box } from "@mui/material";
import { useState } from "react";

function Search() {
   const [searchResult, setSearchResult] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [loading, setLoading] = useState(false);

   return (
      <Box height="100vh" bgcolor="#fff">
         <SearchContainer
            setSearchResult={setSearchResult}
            searchText={searchText}
            setSearchText={setSearchText}
            setLoading={setLoading}
         />
         <SearchResultContainer
            searchResult={searchResult}
            searchText={searchText}
            loading={loading}
         />
      </Box>
   );
}

export default Search;
