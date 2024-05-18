import { Button, FormControl, Grid, MenuItem, Select, Typography, styled } from "@mui/material";
import React from "react";

const SubmitBtn = styled(Button)({
   height: "40px",
   borderRadius: "10px",
   fontSize: "12px",
   mt: "20px",
});

function ChooseTable() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
   return (
      <Grid container p={2}>
         <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
         >
            <Typography component="h6" variant="h6" color="primary" mb={2}>
               CHOOSE TABLE
            </Typography>
         </Grid>
         <Grid item xs={12}>
            <FormControl sx={{ minWidth: "100%" }} size="small">
               <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
               >
                  <MenuItem value="">
                     <em>Select Table</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
               </Select>
               {/* <FormHelperText>Without label</FormHelperText> */}
            </FormControl>
         </Grid>

         <Grid item xs={12} mt={2}>
            <SubmitBtn variant="contained" fullWidth>
              SUBMIT
            </SubmitBtn>
         </Grid>
      </Grid>
   );
}

export default ChooseTable;
