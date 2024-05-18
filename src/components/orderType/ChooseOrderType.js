import { Box, Button, Dialog, styled } from "@mui/material";
import React from "react";
import { PropTypes } from "prop-types";
import logowhite from "../../assets/icons/png/logowhite.png";
import DineInIcon from "../../assets/icons/svg/DineInIcon";
import TakeAwayIcon from "../../assets/icons/svg/TakeAwayIcon";

const CustomDialog = styled(Dialog)(({ theme }) => ({
   "& .MuiDialog-container": {
      backgroundColor: "#000000CC",
   },
   "& .MuiPaper-root": {
      minWidth: "100%",
      height: "100%",
      backgroundColor: "transparent",
      color: "white",
      boxShadow: "none",
      [theme.breakpoints.up("sm")]: {
         width: "100%",
         height: "100%",
      },
      [theme.breakpoints.up("md")]: {
         width: "100%",
         height: "100%",
      },
   },
}));

const CustomBtn = styled(Button)(({ clr }) => ({
   width: "220px",
   height: "45px",
   backgroundColor: clr,
   fontSize: "16px !important",
   fontWeight: "600 ",
   boxShadow: "none",
}));

function ChooseOrderType({ open, closeModal, handleOrderType }) {
   const handleButtonSelect = (type) => {
      handleOrderType(type);
      closeModal();
   };

   return (
      <CustomDialog open={open} onClose={closeModal}>
         <Box
            sx={{
               height: "100%",
               width: "100%",
               backgroundColor: "transparent",
            }}
         >
            <Box height="200" display="flex" justifyContent="center">
               <div
                  style={{
                     height: "180px",
                     width: "180px",
                  }}
               >
                  <img src={logowhite} alt="logo" />
               </div>
            </Box>
            <Box
               height="200px"
               display="flex"
               flexDirection="column"
               justifyContent="end"
               alignItems="center"
               gap={2}
            >
               <CustomBtn
                  clr="#05C805"
                  variant="contained"
                  startIcon={<DineInIcon />}
                  onClick={() => handleButtonSelect("dining")}
               >
                  Dine In
               </CustomBtn>
               <CustomBtn
                  clr="#F57C24"
                  variant="contained"
                  startIcon={<TakeAwayIcon />}
                  onClick={() => handleButtonSelect("take_away")}
               >
                  Take Away
               </CustomBtn>
            </Box>
         </Box>
      </CustomDialog>
   );
}

ChooseOrderType.propTypes = {
   open: PropTypes.bool,
   closeModal: PropTypes.func,
   handleOrderType: PropTypes.func,
};

export default ChooseOrderType;
