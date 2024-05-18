import { Box, Typography, styled } from "@mui/material";
import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import PreperationTime from "../common/PreperationTime";
import { useNavigate } from "react-router-dom";
import defaultItemImage from "../../assets/icons/svg/defaultMenuImage.svg";

const OfferBannerBox = styled(Box)({
   minWidth: "200px",
   height: "100%",
   borderRadius: "15px",
   marginRight: "15px",
   backgroundColor: "#fff",
   boxShadow: "0px 0px 8px -1px rgba(0, 0, 0, 0.29)",
});

function TodaySpecialCard({ item }) {
   const navigate = useNavigate();

   const handleDetailPage = () => {
      navigate(`/menuItem-view/${item?.id}`);
   };
   //Function to trim large text
   const trimText = (text, length) => {
    
      return text.slice(0, length);
   };
   return (
      <OfferBannerBox  onClick={(e) => handleDetailPage(e)}>
         <Box
           
            sx={{
               height: "105px",
               padding: "5px",
               borderRadius: "15px",
            }}
         >
            <img
               src={item?.images[0]?.name || defaultItemImage}
               alt="special"
               height="100%"
               width="100%"
               style={{ borderRadius: "15px",objectFit:'cover' }}
            />
         </Box>
         <Box
            sx={{
               height: "55px",
               bgcolor: "white",
               padding: "0px 5px 5px 5px",
            }}
         >
            {item?.name.length > 18 ? (
               <Typography
                  fontSize="16px"
                  color="#212121"
                  fontWeight="fontWeightMedium"
               >
                  {trimText(item?.name, 18)}...
               </Typography>
            ) : (
               <Typography
                  fontSize="16px"
                  color="#212121"
                  fontWeight="fontWeightMedium"
               >
                  {item?.name}
               </Typography>
            )}

            <Typography fontSize="10px" fontWeight="fontWeightRegular">
               {item?.shortDescription?.slice(0, 50)}
               {item?.shortDescription?.length > 50 && "..."}
            </Typography>
         </Box>
         <Box
            sx={{
               padding: "0px 5px 5px 5px",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <Box display="flex" alignItems="center">
               <span>
                  <StarRateIcon
                     sx={{ fontSize: "14px", mt: "5px", color: "#BB3138" }}
                  />
               </span>
               <span style={{ fontSize: "14px" }}>4.1</span>
            </Box>
            <PreperationTime time={item?.preparationTime} />
         </Box>
      </OfferBannerBox>
   );
}

export default TodaySpecialCard;
