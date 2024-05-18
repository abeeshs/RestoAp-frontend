import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function VerifyOTP({
   isLoading,
   verifyOtp,
   handleFormSubmit,
   otpError,
   setOtpError,
}) {
   //State for storing countdown
   const [time, setTime] = useState(30);

   //State for storing entered OTP
   const [otp, setOtp] = useState("");

   //Function to handle OTP change
   const handleOtpChange = (newValue) => {
      if (otp.length < 7) setOtpError("");
      setOtp(newValue);
   };

   //Function to handle resend OTP
   const handleResend = (e) => {
      handleFormSubmit(e);
      setTime(30);
   };
   const decreaseNum = () => setTime((prev) => (prev > 0 ? prev - 1 : 0));

   const intervalRef = useRef();
   useEffect(() => {
      //Timer function
      intervalRef.current = setInterval(() => {
         if (time > 0) {
            decreaseNum();
         } else {
            clearInterval(intervalRef.current);
         }
      }, 1000);
      return () => clearInterval(intervalRef.current);
   }, []);

   return (
      <Grid
         item
         xs={12}
         display="flex"
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
         p={1}
      >
         <Typography component="h6" variant="h6" color="primary" mb={2}>
            VERIFY OTP
         </Typography>
         <Box width="100%" height="40px">
            <Typography
               variant="body2"
               sx={{ fontSize: "14px", mt: "5px", color: "black" }}
            >
               Enter OTP
            </Typography>
            <Box textAlign="center" mt="-5px">
               {otpError && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                     {otpError}
                  </span>
               )}
            </Box>
         </Box>
         <OtpInput
            onChange={handleOtpChange}
            value={otp}
            numInputs={6}
            shouldAutoFocus
            inputType="number"
            inputStyle="OtpInput"
            style={{ border: "none" }}
            containerStyle={{ height: "55px", borderColor: "red !Important" }}
            renderInput={(props) => <input {...props} />}
         />
         {/* <MuiOtpInput
            length={6}
            value={otp}
            gap={0.5}
            height="55px"
            onChange={handleOtpChange}
           
            sx={{
               borderColor: "red !important",
               "& .MuiInputBase-root": {
                  borderRadius: "4px",
                  border: "1px solid #BB3138",
               },
               "& .MuiInputBase-input": {
                  padding: "8px 8px",
                  borderRadius: "none",
                  border: "none",
               },
            }}
         /> */}
         <Button
            variant="contained"
            disabled={otp.length >= 6 ? false : true}
            fullWidth
            sx={{ mt: "20px" }}
            onClick={() => verifyOtp(otp)}
         >
            {isLoading && (
               <CircularProgress
                  sx={{
                     width: "13px !important",
                     height: "13px !important",
                     color: "#fff",
                     marginRight: "5px",
                  }}
               />
            )}
            VERIFY
         </Button>
         <Typography variant="body2" sx={{ color: "black" }} mt={2}>
            {`Didn't you receive any OTP?`}
         </Typography>
         {time === 0 ? (
            <Button
               variant="text"
               onClick={(e) => handleResend(e)}
               sx={{ mt: "10px", fontSize: "16px !important" }}
            >
               Resend OTP
            </Button>
         ) : (
            <Button sx={{ mt: "10px", fontSize: "16px !important" }}>
               {time < 10 ? "00:0" + time : "00:" + time}
            </Button>
         )}
      </Grid>
   );
}

export default VerifyOTP;
