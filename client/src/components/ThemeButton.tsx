import { Fab } from "@mui/material";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { setDarkTheme, setLightTheme } from "../redux/theme/themeReducer";

const styles = { position: "fixed", right: 0, bottom: 0, mb: 1, mr: 1 };

export default function ThemeButton() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(
    (state: RootState) => state.themeReducer.themeType
  );

  const toggleTheme = () => {
    if (currentTheme === "light") {
      dispatch(setDarkTheme());
      localStorage.setItem("Theme", "dark");
    } else {
      dispatch(setLightTheme());
      localStorage.setItem("Theme", "light");
    }
  };

  return (
    <Fab color="primary" variant="circular" onClick={toggleTheme} sx={styles}>
      <PaletteOutlinedIcon sx={{ fontSize: "2rem" }} />
    </Fab>
  );
}
