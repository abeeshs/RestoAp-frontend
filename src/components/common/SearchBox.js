import {
   Box,
   IconButton,
   InputAdornment,
   TextField,
   styled,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const MainBox = styled(Box)({
   width: "100%",
   display: "flex",
   minHeight: "40px",
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "#fff",
});

const SearchInputBox = styled(TextField)(({ theme, width }) => ({
   padding: "4px",
   minHeight: "40px",
   width: width,
   borderRadius: "10px",
   boxShadow: "0px 0px 6px -1px rgba(0, 0, 0, 0.29)",
   color: "red",
   backgroundColor: "white",

   [theme.breakpoints.up("sm")]: {
      width: "320px",
   },
}));

const SearchBox = ({ isTop, searchText, handleChange }) => {
   // const sty = {
   //    padding: "8px 0px 0px 19px",
   //    "& .MuiInputBase-input": {
   //       padding: "8px 0px 0px 19px",
   //    },
   // };
   const navigate = useNavigate();

   return (
      <MainBox>
         <SearchInputBox
            width={isTop ? "100%" : "100%"}
            variant="standard"
            onClick={() => navigate("/search")}
            onChange={handleChange}
            value={searchText}
            InputProps={{
               disableUnderline: true,
               startAdornment: (
                  <InputAdornment position="start">
                     <IconButton
                        sx={{
                           width: "34px",
                           height: "34px",
                           margin: "3px",
                        }}
                     >
                        <SearchIcon style={{ color: "#BB3138" }} />
                     </IconButton>
                  </InputAdornment>
               ),
            }}
            InputLabelProps={{
               shrink: true,
            }}
            placeholder={isTop ? "Search in Harsha Dhaba" : "Search..."}
         />
      </MainBox>
   );
};

export default SearchBox;
