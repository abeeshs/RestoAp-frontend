import { Dialog, styled } from "@mui/material";
import React from "react";

/* COMMON MODAL USED FOR OTP LOGIN,CHOOSE PAYMENT OPTION */

const CustomDialog = styled(Dialog)(({ theme, color }) => ({
   minWidth: "250px",

   "& .MuiPaper-root": {
      minWidth: "285px",
      overFlowY: "scroll",
      backgroundColor: color,
      color: "white",
      [theme.breakpoints.up("sm")]: {
         width: "350px",
      },
      [theme.breakpoints.up("md")]: {
         width: "450px",
      },
   },
}));

function CommonModal({ open, children, color, handleClose }) {
   return (
      <CustomDialog
         open={open}
         onClose={handleClose}
         color={color ? color : "white"}
      >
         {children}
      </CustomDialog>
   );
}

export default CommonModal;
