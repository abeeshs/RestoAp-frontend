import { Backdrop } from "@mui/material";
import Lottie from "lottie-react";
import React, { useRef } from "react";

import loadingAnime from "../../assets/icons/animations/loadinganime.json";

function LoadingPage() {
   const loadingRef = useRef(null);

   return (
      <Backdrop  sx={{ color:'#fff',backgroundColor:"#fff"}} open={true}>
         <Lottie lottieRef={loadingRef} animationData={loadingAnime}></Lottie>
      </Backdrop>
   );
}

export default LoadingPage;
