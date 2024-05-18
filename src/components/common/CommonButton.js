import { Button, styled } from "@mui/material";
import React from "react";

const CustomButton = styled(Button)({
   backgroundColor: "#BB3138",
   fontSize: "16px !important",
   fontWeight: "500 !important",
   color: "#fff",
   boxShadow: " 0px 0px 1px 1px rgba(0, 0, 0, 0.10)",
});

function CommonButton({ text, isDisabled, fun }) {
   return (
      <CustomButton
         variant="contained"
         color="grey"
         disabled={isDisabled}
         onClick={fun}
      >
         {text}
      </CustomButton>
   );
}

export default CommonButton;
