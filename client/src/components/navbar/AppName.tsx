import { Box, IconButton, Typography } from "@mui/material";
import HistoryEduSharpIcon from "@mui/icons-material/HistoryEduSharp";

export default function AppName() {
  return (
    <Box className="app-name">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        href="/"
      >
        <HistoryEduSharpIcon />
      </IconButton>
      <Typography variant="h5" component="div">
        QuizApp
      </Typography>
    </Box>
  );
}
