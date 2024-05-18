import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React from "react";

const ItemName = styled(Typography)({
   color: "#212121",
   fontSize: "16px",
   fontStyle: "normal",
   fontWeight: 500,
   lineHeight: "21px",
});

function CommonItemName({ name }) {
   return <ItemName>{name}</ItemName>;
}

export default CommonItemName;
