import {
   Box,
   Button,
   CircularProgress,
   Grid,
   TextField,
   Typography,
   styled,
} from "@mui/material";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { userLoginSuccess, userLoginFailure } from "../../store/slices/user";
import { auth, googleProvider } from "../../config/firebase";
import GoogleIcon from "../../assets/icons/svg/Google";
import CommonModal from "../common/CommonModal";
import API from "../../config/axios";
import VerifyOTP from "./VerifyOTP";

const CustomGrid = styled(Grid)({
   marginTop: "16px",
   minHeight: "40px",
   display: "flex",
   flexDirection: "column",
   justifyContent: "center",
});

const CustomTextField = styled(TextField)({
   width: "100%",
   borderRadius: "10px",
   margin: "0px",
   backgroundColor: "white",
   '& .MuiInputBase-formControl':{
      
   }
   
});

const SendOtpBtn = styled(Button)({
   height: "40px",
   borderRadius: "10px",
   fontSize: "14px !important",
});

function SignInFormSection() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   //Button loading state
   const [isLoading, setIsLoading] = useState(false);

   //State for showing otp input
   const [showOtpInput, setShowOtpInput] = useState(false);

   //State for storing response
   const [confirmObject, setConfirmObject] = useState("");

   //State for storing phone number and name
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
   });
   //State for storing otp error
   const [otpError, setOtpError] = useState("");

   //State for storing name and phone error
   const [errors, setErrors] = useState({});

   //Function to validate phone and name input
   const validateForm = () => {
      const newErrors = {};

      if (!formData.name.trim()) {
         newErrors.name = "Name required";
      } else if (formData.name && formData.name.length < 3) {
         newErrors.name = "Name must have at least three letters";
      } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
         newErrors.name = "Name should only contain letters";
      }

      if (!isValidPhoneNumber(formData.phone)) {
         newErrors.phone = "Enter valid number";
      }
      return newErrors;
   };

   //Captcha setup
   const setUpRecaptcha = async () => {
      if (!window.recaptchaVerifier) {
         window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
               size: "invisible",
               callback: (response) => {
                  console.log("reCAPTCHA solved:", response);
               },
            },
            auth
         );
      }
   };

   const onSignUp = async (number) => {
      setUpRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, number, appVerifier)
         .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setConfirmObject(confirmationResult);
            toast.success("OTP Sent");
            setIsLoading(false);
            setShowOtpInput(true);
         })
         .catch((error) => {
            setIsLoading(false);
            toast.error("Something went wrong");
            console.log(error);
         });
   };

   //OTP Signup handling function
   const handleFormSubmit = async (e) => {
      try {
         e.preventDefault();
         const newErrors = validateForm();
         setErrors(newErrors);
         if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            const response = await onSignUp(formData.phone);
            console.log("Response from onSignUp", response);
         }
      } catch (err) {
         setIsLoading(false);
         console.log(err);
      }
   };
   //Funtion to varify the OTP
   const verifyOtp = async (otp) => {
      try {
         setIsLoading(true);
         await confirmObject.confirm(otp);
         const currentUser = auth.currentUser;
         console.log({ currentUser });
         if (!currentUser) setOtpError("Invalid OTP");
         const response = await API.post("/auth/register", {
            firstName: formData.name,
         });
         if (response?.data) {
            setIsLoading(false);
            console.log("CURRENT USER", response);
            dispatch(userLoginSuccess(currentUser));
            localStorage.setItem("accessToken", currentUser.accessToken);
            setShowOtpInput(false);
            navigate(-1);
         }
      } catch (error) {
         console.log("ERROR", error.message);
         setOtpError("Invalid OTP");
         setIsLoading(false);
      }
   };

   //Login with google handle function
   const handleLoginWithGoogle = () => {
      auth
         .signInWithPopup(googleProvider)
         .then((result) => {
            dispatch(userLoginSuccess(result));
            API.post("/auth/register");
            localStorage.setItem("accessToken", result.credential.idToken);
            navigate("/");
         })
         .catch((error) => {
            dispatch(userLoginFailure(error.message));
            console.log(error);
         });
   };

   //Function to handle name input change
   const handleNameChange = (e) => {
      setFormData((prev) => ({
         ...prev,
         name: e.target.value,
      }));
   };
   //Function to handle phone input change
   const handlePhoneChange = (num) => {
      setFormData((prev) => ({
         ...prev,
         phone: num,
      }));
   };

   return (
      <Grid item xs={12} md={12}>
         <Toaster />
         <Grid
            container
            sx={{
               padding: "0px 35px 0px",
               display: "flex",
               justifyContent: "center",
               minWidth: "100%",
            }}
         >
            <Grid item xs={12} sm={12}>
               <Typography
                  component="h6"
                  variant="h5"
                  sx={{
                     fontSize: "20px",
                     color: "#BB3138",
                     fontWeight: 800,
                  }}
               >
                  SIGN IN
               </Typography>
            </Grid>
            <form
               onSubmit={handleFormSubmit}
               style={{
                  minWidth: "100%",
               }}
            >
               <CustomGrid item xs={12}>
                  <CustomTextField
                     id="name"
                     label="Name"
                     variant="outlined"
                     size="small"
                     value={formData.name}
                     onChange={handleNameChange}
                     margin="normal"
                  />
                  <span style={{ color: "red", fontSize: "12px" }}>
                     {errors?.name}
                  </span>
               </CustomGrid>
               <CustomGrid item xs={12}>
                  <PhoneInput
                     defaultCountry="IN"
                     value={formData.phone}
                     onChange={handlePhoneChange}
                     placeholder="Phone number"
                     style={{
                        height: "40px",
                        padding: "0px 6px 0px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                        outline: "none",
                        border: "1px solid #000",
                        minWidth: "100%",
                        ":focus": {
                           color: "red",
                        },
                     }}
                  />
                  <span style={{ color: "red", fontSize: "12px" }}>
                     {errors?.phone}
                  </span>
                  <div
                     id="recaptcha-container"
                     style={{ display: "none" }}
                  ></div>
               </CustomGrid>
               <CustomGrid item xs={12}>
                  <SendOtpBtn variant="contained" fullWidth type="submit">
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
                     SEND ONE TIME PASSWORD
                  </SendOtpBtn>
               </CustomGrid>
            </form>
            <Grid item xs={12}>
               <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt="10px"
               >
                  <Box
                     sx={{
                        height: "1.5px",
                        width: "45%",
                        backgroundColor: "black",
                     }}
                  ></Box>
                  <p style={{ margin: "0px 5px" }}>or</p>
                  <Box
                     sx={{
                        height: "1.5px",
                        width: "45%",
                        backgroundColor: "black",
                     }}
                  ></Box>
               </Box>
            </Grid>

            <CustomGrid item xs={12}>
               <SendOtpBtn
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  fullWidth
                  type="submit"
                  onClick={handleLoginWithGoogle}
               >
                  CONTINUE WITH GOOGLE
               </SendOtpBtn>
            </CustomGrid>

            {showOtpInput && (
               <CommonModal open={showOtpInput}>
                  <VerifyOTP
                     verifyOtp={verifyOtp}
                     handleFormSubmit={handleFormSubmit}
                     otpError={otpError}
                     isLoading={isLoading}
                     setOtpError={setOtpError}
                  />
               </CommonModal>
            )}
         </Grid>
      </Grid>
   );
}

export default SignInFormSection;
