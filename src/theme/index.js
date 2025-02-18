import React from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
// components
// import { useSettingsContext } from "../components/settings";
//
import palette from "./palette";
import typography from "./typography";
import shadows from "./shadows";
import customShadows from "./customShadows";
import ComponentsOverrides from "./overrides";
import GlobalStyles from "./globalStyles";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  //   const { themeMode, themeDirection } = useSettingsContext();

  const themeOptions = useMemo(
    () => ({
      palette: palette(),
      typography,
      shape: { borderRadius: 8 },
      //   direction: themeDirection,
      shadows: shadows("light"),
      customShadows: customShadows(),
    }),
    []
  );

  const theme = createTheme(themeOptions);

  theme.components = ComponentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
