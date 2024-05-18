import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import StoreBanner from "./StoreBanner";
import CommonModal from "../common/CommonModal";
import ChooseTable from "./ChooseTable";
import ChooseOrderType from "../orderType/ChooseOrderType";
import MainItemContainer from "./MainItemContainer";
import { useDispatch, useSelector } from "react-redux";
import { setOrderType } from "../../store/slices/orderType";

const Home = ({ showTable, showOption, setShowOption }) => {
   const dispatch = useDispatch();
   const handleClose = () => setShowOption(false);
   const { orderType } = useSelector((state) => state.orderType);

   const handleOrderType = (type) => {
      dispatch(setOrderType(type));
   };

   return (
      <Box>
         <ChooseOrderType
            open={showOption}
            closeModal={handleClose}
            handleOrderType={handleOrderType}
         />
         <StoreBanner />
            <MainItemContainer orderType={orderType} />
         <CommonModal open={showTable}>
            <ChooseTable />
         </CommonModal>
         {/* {totalCartCount && <FixedBottomCard totalCartCount={totalCartCount} />} */}
      </Box>
   );
};

Home.propTypes = {
   showTable: PropTypes.bool,
   showOption: PropTypes.bool,
   setShowOption: PropTypes.func,
};

export default Home;
