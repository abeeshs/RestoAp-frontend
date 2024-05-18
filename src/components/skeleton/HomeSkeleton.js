import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

function HomeSkeleton() {
   return (
      <Box bgcolor="#fff" height="100vh" width="100%">
         <Stack spacing={1}>
            <Skeleton animation="wave" variant="rounded" height={230} />
            <Box padding={1}>
               <Skeleton animation="wave" variant="rounded" height={50} />
            </Box>
            <Box display="flex" justifyContent="space-between" padding={1}>
               <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem", width: "100px" }}
               />
               <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem", width: "100px" }}
               />
            </Box>
            <Box display="flex" gap={1} padding={1}>
               <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={230}
                  width={262}
               />
               <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={230}
                  width={262}
               />
            </Box>
            <Box p={1}>
               <Skeleton animation="wave" variant="rounded" height={60} />
            </Box>
         </Stack>
      </Box>
   );
}

export default HomeSkeleton;
