import { Skeleton, Stack } from "@mui/material";
import React from "react";

function itemSkeleton() {
   return (
      <Stack spacing={1}>
         <Skeleton height={100} variant="rounded" animation="wave"/>
         <Skeleton height={100} variant="rounded" animation="wave"/>
         <Skeleton height={100} variant="rounded" animation="wave"/>
         <Skeleton height={100} variant="rounded" animation="wave"/>
         <Skeleton height={100} variant="rounded" animation="wave"/>
      </Stack>
   );
}

export default itemSkeleton;
