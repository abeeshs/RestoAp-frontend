import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

function ItemDetailPageSkeleton() {
   return (
      <Box p={2} bgcolor="#fff">
         <Stack spacing={2}>
            <Skeleton variant="rounded" width="100%" height={200} />
            <Skeleton variant="rounded" width="100%" height={40} />
            <Skeleton variant="rounded" width="100%" height={100} />
            <Skeleton variant="rounded" width="100%" height={100} />
            <Skeleton variant="rounded" width="100%" height={200} />

         </Stack>
      </Box>
   );
}

export default ItemDetailPageSkeleton;
