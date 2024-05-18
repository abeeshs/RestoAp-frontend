import { FormControl, FormControlLabel, Switch, styled } from "@mui/material";
import React, { useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box } from "@mui/system";
import Categories from "./Categories";
import CartFullView from "../cart/CartFullView";
import ItemSkeleton from "../skeleton/ItemSkeleton";
import { setOrderType } from "../../store/slices/orderType";

const MaterialUISwitch = styled(Switch)(({ bg }) => ({
   width: 61,
   height: 25,
   padding: 7,
   "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      marginTop: 5,
      transform: "translateX(5px)",
      "&.Mui-checked": {
         color: "#fff",
         transform: "translateX(36px)",
         "& .MuiSwitch-thumb:before": {
            padding: "2px",
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundColor: bg, // Your circle color
            borderRadius: "50%",
         },
         "& + .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: bg,
         },
      },
   },
   "& .MuiSwitch-thumb": {
      // backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 20,
      height: 20,
      padding: "5px",
      borderRadius: "6px",
      border: `2px solid ${bg}`,
      margin: "-3px",

      "&:before": {
         content: '""',
         position: "absolute",
         width: "100%",
         height: "100%",
         left: 0,
         top: 0,
         backgroundColor: bg, // Your circle color
         borderRadius: "50%",
      },
   },
   "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "grey",
      borderRadius: 20 / 2,
   },
}));

function MenuListSection() {
   const dispatch = useDispatch();
   const [categoryTop, setCategoryTop] = useState(false);
   const [filteredItems, setFilteredItems] = useState([]);
   const [categories, setCategories] = useState([]);
   const [toggle, setToggleBar] = useState(false);
   const [currentCartItem, setCurrentCartItem] = useState({});
   const [veg, setVeg] = useState(false);
   const [nonVeg, setNonVeg] = useState(false);
   const [activeCategory, setActiveCategory] = useState("all");

   // Menu items from Redux store
   const { menuItems, loading } = useSelector((state) => state.menu);
   // Get order type from Redux Store
   const { orderType } = useSelector((state) => state.orderType);

   // Initialize categories and filteredItems when menuItems change
   useEffect(() => {
      if (menuItems?.length > 0) {
         const categoriesArray = [];
         const itemsArray = [];
         menuItems.forEach((category) => {
            categoriesArray.push(category._id);
            itemsArray.push(category.items);
         });
         setCategories(categoriesArray);
         setFilteredItems(itemsArray.flat());
      }
   }, [menuItems]);

   //========================== Functions ==================================
   // Function to open the expand cart
   const openExpandCart = () => setToggleBar(true);

   // Function to close the expand cart
   const closeExpandCart = () => setToggleBar(false);

   //Function to change order type
   const handleChange = (e) => dispatch(setOrderType(e.target.value));

   //Fuction to filter menu items by category name
   const filterByCategory = (category) =>
      menuItems?.find((item) => item._id === category)?.items || [];

   // Function to set all menu items
   const showAllMenuItems = () =>
      menuItems?.map((category) => category.items).flat() || [];

   //Function to handle variant
   const handleVariant = (currentItem) => setCurrentCartItem(currentItem);

   //Function to handle change category
   const changeCategory = (category) => {
      setActiveCategory(category);
      const items =
         category === "all" ? showAllMenuItems() : filterByCategory(category);
      setFilteredItems(items);
   };

   //Scroll listening function
   const listenToScrol = () => {
      const categoryScroll = 420;
      const scrol = window.scrollY;
      scrol >= categoryScroll ? setCategoryTop(true) : setCategoryTop(false);
   };

   //Useeffect for listen scroll
   useEffect(() => {
      window.addEventListener("scroll", listenToScrol);
      return () => window.removeEventListener("scroll", listenToScrol);
   }, [menuItems]);

   //Function to handle filter item by veg
   const handleSwitchVeg = (event) => {
      setVeg(event.target.checked);
      if (event.target.checked) {
         const itemsByCategory =
            activeCategory === "all"
               ? showAllMenuItems()
               : filterByCategory(activeCategory);

         setFilteredItems(
            itemsByCategory.filter((item) => item.foodCategory === "Veg")
         );
      } else {
         activeCategory === "all"
            ? setFilteredItems(showAllMenuItems())
            : setFilteredItems(filterByCategory(activeCategory));
      }

      if (event.target.checked && nonVeg) setNonVeg(false);
   };

   //Function to handle filter items by non veg
   const handleSwitchNonVeg = (event) => {
      setNonVeg(event.target.checked);
      if (event.target.checked) {
         const itemsByCategory =
            activeCategory === "all"
               ? showAllMenuItems()
               : filterByCategory(activeCategory);
         setFilteredItems(
            itemsByCategory.filter((item) => item.foodCategory === "Non-Veg")
         );
      } else {
         activeCategory === "all"
            ? setFilteredItems(showAllMenuItems())
            : setFilteredItems(filterByCategory(activeCategory));
      }
      if (event.target.checked && veg) setVeg(false);
   };

   return (
      <>
         {/* Category section */}
         {categoryTop && (
            <Box
               sx={{
                  position: "fixed",
                  top: 60,
                  bgcolor: "#fff",
                  width: "100%",
                  zIndex: 1,
               }}
            >
               <Categories
                  categories={categories}
                  changeCategory={changeCategory}
                  activeCategory={activeCategory}
               />
               <Box
                  sx={{
                     height: "50px",
                     margin: "10px 10px 0px 10px",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                  }}
               >
                  <Box display="flex">
                     <Box
                        sx={{
                           boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.10)",
                           borderRadius: "15px",
                        }}
                     >
                        <FormControlLabel
                           sx={{ margin: "0px", height: "35px" }}
                           control={
                              <MaterialUISwitch
                                 sx={{ m: 1 }}
                                 checked={veg}
                                 bg="green"
                                 onChange={handleSwitchVeg}
                              />
                           }
                        />
                     </Box>
                     <Box
                        sx={{
                           boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.10)",
                           borderRadius: "15px",
                           height: "35px",
                           ml: "15px",
                        }}
                     >
                        <FormControlLabel
                           sx={{ height: "35px", margin: "0px" }}
                           control={
                              <MaterialUISwitch
                                 sx={{ m: 1 }}
                                 checked={nonVeg}
                                 bg="red"
                                 onChange={handleSwitchNonVeg}
                              />
                           }
                        />
                     </Box>
                  </Box>
                  <Box display="flex" justifyContent="end">
                     <Box
                        sx={{
                           boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.10)",
                           borderRadius: "5px",
                           height: "35px",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <FormControl
                           sx={{
                              minWidth: 120,
                              height: "35px",
                              "& .MuiInputBase-root": {
                                 height: "35px",
                                 backgroundColor: "#BB3138",
                                 color: "#fff",
                              },
                           }}
                           size="small"
                        >
                           <select
                              style={{
                                 height: "35px",
                                 backgroundColor: "#BB3138",
                                 borderRadius: "8px",
                                 color: "#fff",
                                 padding: "0px 10px 0px 10px",
                              }}
                              value={orderType}
                              onChange={handleChange}
                           >
                              <option
                                 style={{
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    fontFamily: "Poppins",
                                    height: "20px",
                                    ":hover": {
                                       border: "none",
                                    },
                                 }}
                                 value={"dining"}
                              >
                                 Dine In
                              </option>
                              <option value={"take_away"}>Take Away</option>
                           </select>
                        </FormControl>
                     </Box>
                  </Box>
               </Box>
            </Box>
         )}

         <Categories
            categories={categories}
            changeCategory={changeCategory}
            activeCategory={activeCategory}
         />
         <Box
            sx={{
               height: "50px",
               margin: "10px 10px 0px 10px",
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
            }}
         >
            <Box display="flex">
               {/* <FormGroup display="flex"> */}
               <Box
                  sx={{
                     boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.10)",
                     borderRadius: "15px",
                  }}
               >
                  <FormControlLabel
                     sx={{ margin: "0px", height: "35px" }}
                     control={
                        <MaterialUISwitch
                           sx={{ m: 1 }}
                           checked={veg}
                           bg="green"
                           onChange={handleSwitchVeg}
                        />
                     }
                  />
               </Box>
               <Box
                  sx={{
                     boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.10)",
                     borderRadius: "15px",
                     height: "35px",
                     ml: "15px",
                  }}
               >
                  <FormControlLabel
                     sx={{ height: "35px", margin: "0px" }}
                     control={
                        <MaterialUISwitch
                           sx={{ m: 1 }}
                           checked={nonVeg}
                           bg="red"
                           onChange={handleSwitchNonVeg}
                        />
                     }
                  />
               </Box>
               {/* </FormGroup> */}
            </Box>
            <Box width="50px" display="flex" justifyContent="end">
               <Box
                  sx={{
                     height: "35px",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "end",
                     width: "200px",
                  }}
               >
                  <FormControl
                     sx={{
                        minWidth: 120,
                        height: "35px",
                        "& .MuiInputBase-root": {
                           height: "35px",
                           backgroundColor: "#BB3138",
                           color: "#fff",
                        },
                     }}
                     size="small"
                  >
                     <select
                        style={{
                           height: "35px",
                           backgroundColor: "#BB3138",
                           borderRadius: "8px",
                           color: "#fff",
                           padding: "0px 10px 0px 10px",
                        }}
                        value={orderType}
                        onChange={handleChange}
                     >
                        <option
                           style={{
                              fontSize: "12px",
                              fontWeight: "500",
                              fontFamily: "Poppins",
                              height: "20px",
                              ":hover": {
                                 border: "none",
                              },
                           }}
                           value={"dining"}
                        >
                           Dine In
                        </option>
                        <option value={"take_away"}>Take Away</option>
                     </select>
                  </FormControl>
               </Box>
            </Box>
         </Box>
         {/* Menu list section  */}
         <Box
            sx={{
               margin: "10px 10px 128px 10px",
            }}
         >
            {loading && (
               <>
                  <ItemSkeleton />
                  <ItemSkeleton />
                  <ItemSkeleton />
                  <ItemSkeleton />
                  <ItemSkeleton />
               </>
            )}
            {filteredItems?.map((item) => (
               <MenuItemCard
                  key={item.id}
                  item={item}
                  handleVariant={handleVariant}
                  openExpandCart={openExpandCart}
               />
            ))}
         </Box>
         {toggle && (
            <CartFullView
               open={toggle}
               closeExpandCart={closeExpandCart}
               item={currentCartItem}
            />
         )}
      </>
   );
}

export default MenuListSection;
