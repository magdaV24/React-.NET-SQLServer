// Material UI components
import { AppBar, Box } from "@mui/material";
// Redux imports
import { RootState, useAppSelector } from "../../redux/store";
// Styles
import "../../styles/components/navbar.css";
// Custom components
import AppName from "./AppName";
import AuthButtons from "./AuthButtons";
import UserButtons from "./UserButtons";


interface Props {
  showLogin: () => void;
  showRegister: () => void;
  showAddCard: () => void;
}
export default function Navbar({
  showLogin,
  showRegister,
  showAddCard,
}: Props) {

  const user = useAppSelector((state: RootState) => state.tokenReducer.user);

  return (
    <AppBar position="fixed" className="navbar-wrapper">
      <Box className="navbar">
        <AppName />
        {user ? (
          <UserButtons showAddCard={showAddCard} />
        ) : (
          <AuthButtons showLogin={showLogin} showRegister={showRegister} />
        )}
      </Box>
    </AppBar>
  );
}
