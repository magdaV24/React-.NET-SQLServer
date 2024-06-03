import { ThemeOptions, createTheme } from "@mui/material";
import { darkTheme } from "../styles/themes/darkTheme";
import { lightTheme } from "../styles/themes/lightTheme";

export const getTheme = (themeType: "light" | "dark"): ThemeOptions => {
  return createTheme(themeType === "light" ? lightTheme : darkTheme);
};
