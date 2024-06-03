import ExtensionSharpIcon from "@mui/icons-material/ExtensionSharp";
import { Fab } from "@mui/material";
import { User } from "../types/UserType";

interface Props{
  user: User| null;
  openGameForm:()=>void;
  openLoginForm:()=>void;
}

const styles = { position: "fixed", left: 0, bottom: 0, mb: 1, ml: 1 };

export default function InitializeGameButton({openGameForm, openLoginForm, user}:Props) {

  return (
    <>
      {user ? (
        <Fab variant="extended" onClick={openGameForm} sx={styles}>
          <ExtensionSharpIcon sx={{ mr: 1 }} />
          Start game
        </Fab>
      ) : (
        <Fab variant="extended" onClick={openLoginForm} sx={styles}>
          <ExtensionSharpIcon sx={{ mr: 1 }} />
          Start game
        </Fab>
      )}
    </>
  );
}
