import { Box, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { userLogout } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function SignOutSection() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const handleLogout = () => {
      signOut(auth)
         .then(() => {
            console.log("signout success");
            dispatch(userLogout());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("auth");
            navigate("/");
         })
         .catch((error) => {
            console.log("signout error", error);
         });
   };

   return (
      <Box
         sx={{
            backgroundColor: "#fff", // Background color
            display: "flex",
            flexDirection: "column",
            height: "150px",
            p: "0px 15px 15px 15px",
         }}
      >
         <Box
            sx={{
               borderRadius: "20px",
               boxShadow: "0px 0px 7px -1px rgba(0, 0, 0, 0.29)",
               padding: "20px",
               display: "flex",
               height: "110px",
               flexDirection: "column",
               justifyContent: "space-between",
            }}
         >
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Typography>
                  <SvgIcon>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                     >
                        <path
                           d="M15.9062 5.21875V11.8984C15.8691 12.8313 14.5368 12.8306 14.5 11.8984V5.21875C14.5 3.66794 13.2383 2.40625 11.6875 2.40625H5.21875C3.66794 2.40625 2.40625 3.66794 2.40625 5.21875V14.7812C2.40625 16.3321 3.66794 17.5938 5.21875 17.5938H7.32812C8.26103 17.6309 8.26033 18.9632 7.32812 19H5.21875C2.89253 19 1 17.1075 1 14.7812V5.21875C1 2.89253 2.89253 1 5.21875 1H11.6875C14.0137 1 15.9062 2.89253 15.9062 5.21875ZM12.25 4.44531C12.2129 3.51251 10.8806 3.513 10.8437 4.44531C10.8437 5.02687 10.3706 5.5 9.78906 5.5H7.11719C6.53563 5.5 6.0625 5.02687 6.0625 4.44531C6.0625 4.05698 5.74771 3.74219 5.35937 3.74219C4.97104 3.74219 4.65625 4.05698 4.65625 4.44531C4.65625 5.80227 5.76023 6.90625 7.11719 6.90625H9.78906C11.146 6.90625 12.25 5.80227 12.25 4.44531ZM11.9687 12.0742H8.06641C7.1335 12.1113 7.1342 13.4437 8.06641 13.4805H11.9687C12.9017 13.4433 12.901 12.111 11.9687 12.0742ZM11.9687 9.26172H8.06641C7.1335 9.29884 7.1342 10.6312 8.06641 10.668H11.9687C12.9017 10.6308 12.901 9.29853 11.9687 9.26172ZM17.1793 14.6432L13.5041 18.3545C12.6925 19.2095 11.228 19.2094 10.4165 18.3544L8.79611 16.7103C8.52351 16.4338 8.52674 15.9886 8.80332 15.716C9.07985 15.4434 9.525 15.4467 9.79764 15.7232L11.417 17.3662C11.7035 17.6677 12.2179 17.6675 12.5046 17.3652L16.1801 13.6537C16.8629 13.017 17.8091 13.9548 17.1793 14.6432ZM5.11328 11.8281C4.62788 11.8281 4.23437 12.2216 4.23437 12.707C4.28068 13.8729 5.94606 13.8726 5.99219 12.707C5.99219 12.2216 5.59868 11.8281 5.11328 11.8281ZM5.11328 9.01562C4.62788 9.01562 4.23437 9.40913 4.23437 9.89453C4.28068 11.0604 5.94606 11.0601 5.99219 9.89453C5.99219 9.40913 5.59868 9.01562 5.11328 9.01562Z"
                           fill="#BB3138"
                           stroke="#BB3138"
                           strokeWidth="0.5"
                        />
                     </svg>
                  </SvgIcon>
               </Typography>
               <Typography
                  ml="15px"
                  fontSize="16px"
                  fontWeight="600"
                  color="#BB3138"
                  onClick={()=>navigate('/previous-orders')}
               >
                  MY ALL ORDERS
               </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Typography>
                  <SvgIcon>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="18"
                        viewBox="0 0 17 18"
                        fill="none"
                     >
                        <path
                           d="M0.0359485 10.6739C-0.228602 7.82628 0.987595 5.24692 3.00479 3.60817C3.79109 2.96884 4.96687 3.51632 4.96687 4.52675C4.96687 4.89786 4.79051 5.23957 4.50391 5.47105C3.0746 6.63581 2.21482 8.47296 2.42425 10.5012C2.69615 13.143 4.81255 15.2815 7.45071 15.5754C10.8935 15.9612 13.8183 13.2643 13.8183 9.89859C13.8183 8.11288 12.9916 6.51455 11.7019 5.46738C11.4153 5.23589 11.2426 4.89418 11.2426 4.52675C11.2426 3.52734 12.4 2.9615 13.179 3.58613C15.0235 5.07422 16.2066 7.34862 16.2066 9.89859C16.2066 14.5613 12.2457 18.3201 7.5095 17.9784C3.59268 17.7028 0.399705 14.5833 0.0359485 10.6739ZM8.10106 0C7.43969 0 6.90691 0.536449 6.90691 1.19415V6.6946C6.90691 7.35597 7.44336 7.88875 8.10106 7.88875C8.75876 7.88875 9.29521 7.3523 9.29521 6.6946V1.19415C9.29521 0.536449 8.76244 0 8.10106 0Z"
                           fill="#BB3138"
                        />
                     </svg>
                  </SvgIcon>
               </Typography>
               <Typography
                  ml="15px"
                  fontSize="16px"
                  fontWeight="600"
                  color="#BB3138"
                  onClick={() => handleLogout()}
               >
                  LOG OUT
               </Typography>
            </Box>
         </Box>
      </Box>
   );
}

export default SignOutSection;
