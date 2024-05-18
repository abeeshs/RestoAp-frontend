import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { auth } from "../../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../store/slices/user";

const MobileOTPLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmObject, setConfirmObject] = useState("");

  const setUpRecaptcha = async (number) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
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
        setShowOtpInput(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber === "" || phoneNumber === undefined) {
      console.log("SET ERROR HERE,");
      console.log("ENTER VALID PHONE NUMBER");
    } else {
      const response = await onSignUp(phoneNumber);
      console.log("Response from onSignUp", response);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) {
      console.log("SET ERROR HERE,");
      console.log("ENTER VALID OTP");
    }
    try {
      await confirmObject.confirm(otp);
      const currentUser = auth.currentUser;

      console.log("CURRENT USER", currentUser);
      dispatch(userLoginSuccess(currentUser));

      localStorage.setItem("accessToken", currentUser.accessToken);
      navigate("/");
    } catch (error) {
      console.log("SET ERROR HERE,");
      console.log("ERROR", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>MobileOTPLogin</h1>
        <form
          onSubmit={handleFormSubmit}
          style={{ display: !showOtpInput ? "block" : "none" }}
        >
          <PhoneInput
            defaultCountry="IN"
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter your phone number"
          />
          <div id="recaptcha-container"></div>
          <button type="submit">Send OTP</button>
        </form>
        <form
          onSubmit={verifyOtp}
          style={{ display: showOtpInput ? "block" : "none" }}
        >
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP"
          />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default MobileOTPLogin;
