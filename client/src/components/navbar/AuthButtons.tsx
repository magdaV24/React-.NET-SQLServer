import { Box, Button } from "@mui/material";

interface AuthButtonsProps{
  showLogin: ()=>void
  showRegister: ()=>void
}
export default function AuthButtons({showLogin, showRegister}: AuthButtonsProps) {
  return (
    <Box className="auth-buttons">
      <Button variant="contained" color="secondary" className="auth-button" onClick={showLogin}>
        Login
      </Button>
      <Button variant="contained" color="secondary" className="auth-button" onClick={showRegister}>
        Register
      </Button>
    </Box>
  );
}
