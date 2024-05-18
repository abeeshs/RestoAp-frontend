import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ItemSkeleton from "../skeleton/ItemSkeleton";
import PreperationTime from "../common/PreperationTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SquareIcon from "../common/SquareIcon";
import { useNavigate } from "react-router-dom";


function SearchResultContainer({ searchResult, searchText, loading }) {
  const navigate= useNavigate()
   const handleDetailPage = (e,id) => {
      navigate(`/menuItem-view/${id}`);
   };

   return (
      <>
         <Box sx={{ p: "15px", backgroundColor: "#fff" }}>
            {searchResult &&
               searchResult.length > 0 &&
               searchResult.map((item) => (
                  <Box
                  key={item?.id}
                     sx={{
                        height: 124,
                        boxShadow: "0px 0px 7px -1px rgba(0, 0, 0, 0.29)",
                        borderRadius: "20px",
                        padding: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        mb: "15px",
                        minWidth: "307px",
                     }}
                     onClick={(e) => {
                        handleDetailPage(e,item?.id);
                     }}
                  >
                     <Box
                        sx={{
                           width: "50%",
                           height: "93px",
                           borderRadius: "15px",
                        }}
                     >
                        <img
                           src={item?.images[0]?.name}
                           alt="item"
                           style={{
                              objectFit: "cover",
                              height: "100%",
                              width: "100%",
                              borderRadius: "15px",
                           }}
                        />
                     </Box>
                     <Box
                        pl="10px"
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                     >
                        <Box display="flex" alignItems="center">
                           <Typography textAlign="center" component={"h5"}>
                              {item?.foodCategory === "Non-Veg" ? (
                                 <SquareIcon icon="triangle" color="red" />
                              ) : (
                                 <SquareIcon icon="circle" color="green" />
                              )}
                           </Typography>
                           <Typography
                              ml="6px"
                              fontSize="16px"
                              fontWeight="fontWeightMedium"
                           >
                              {item?.name || "Chicken Biriyani"}
                           </Typography>
                        </Box>
                        <Box
                           mt="3px"
                           sx={{
                              overflow: "hidden",
                              height: "39px",
                           
                              wordBreak: "break-all",
                           }}
                        >
                           <Typography
                              fontSize="12px"
                              fontWeight="fontWeightRegular"
                              sx={{ overflow: "hidden" }}
                           >
                              The point of using Lorem Ipsum is that it has a
                              more-
                           </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                           <Grid container>
                              <Grid
                                 item
                                 xs={4}
                                 display="flex"
                                 alignItems="center"
                              >
                                 <CurrencyRupeeIcon
                                    sx={{
                                       fontSize: "15px",
                                       pt: "1px",
                                       color: "#BB3138",
                                    }}
                                 />
                                 <Typography
                                    sx={{
                                       fontSize: "16px",
                                       color: "#BB3138",
                                       fontWeight: 600,
                                    }}
                                 >
                                    {item?.price || 200}
                                 </Typography>
                              </Grid>
                              <Grid
                                 item
                                 xs={4}
                                 display="flex"
                                 alignItems="center"
                              >
                                 <PreperationTime time={item?.preparationTime} />
                              </Grid>
                              <Grid
                                 item
                                 xs={4}
                                 display="flex"
                                 justifyContent="end"
                              ></Grid>
                           </Grid>
                        </Box>
                     </Box>
                  </Box>
               ))}
            {!loading && searchText && searchResult?.length <= 0 && (
               <Box>
                  <Typography fontWeight="600">
                     No results found for {`"${searchText}"`}
                  </Typography>
               </Box>
            )}
            {loading && searchResult?.length <= 0 && <ItemSkeleton />}
         </Box>
         
      </>
   );
}

export default SearchResultContainer;
