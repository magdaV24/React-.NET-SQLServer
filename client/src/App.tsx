// Context management
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";
import { clearApiResponseState } from "./redux/slices/apiResponseSlice";
import { clearGameState } from "./redux/slices/gameSlice";
import { getTheme } from "./redux/theme/themeReducer";
import { setToken, setUser } from "./redux/slices/tokenSlice";

// React imports
import { useEffect, useState } from "react";

// React router dom imports
import { Routes, Route } from "react-router-dom";

// MUI imports
import { CssBaseline } from "@mui/material";

// Custom hooks
import { useToken } from "./hooks/useToken";
import useFetchSelect from "./hooks/useFetchSelect";

// Custom components
import Navbar from "./components/navbar/Navbar";
import ThemeButton from "./components/ThemeButton";
import Home from "./pages/Home";
import Login from "./forms/Login";
import Register from "./forms/Register";
import AddCard from "./forms/AddCard";
import GameForm from "./forms/GameForm";
import Game from "./components/game/Game";
import UserPage from "./pages/UserPage";
import InitializeGameButton from "./components/InitializeGameButton";
import ErrorAlert from "./components/ErrorAlert";
import SuccessAlert from "./components/SuccessAlert";

function App() {
  // Context management
  const dispatch = useAppDispatch();

  // Setting the navbar by retrieving the current logged in user, if it is the case and defining the props for the forms and components

  const { getToken, getUser } = useToken();

  const currentUser = useAppSelector(
    (state: RootState) => state.tokenReducer.user
  );

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openAddCard, setOpenAddCard] = useState(false);

  function showLogin() {
    setOpenLogin(true);
  }

  function closeLogin() {
    setOpenLogin(false);
  }

  function showRegister() {
    setOpenRegister(true);
  }

  function closeRegister() {
    setOpenRegister(false);
  }

  function showAddCard() {
    setOpenAddCard(true);
  }

  function closeAddCard() {
    setOpenRegister(false);
  }

  function goToRegister() {
    setOpenLogin(false);
    setOpenRegister(true);
  }

  function goToLogin() {
    setOpenLogin(true);
    setOpenRegister(false);
  }
  const token = getToken();
  const userToken = { token: token };

  const user = getUser(userToken);

  //Error and Success alerts

  const openSuccessAlert = useAppSelector(
    (state: RootState) => state.apiResponseReducer.openSuccessAlert
  );
  const openErrorAlert = useAppSelector(
    (state: RootState) => state.apiResponseReducer.openErrorAlert
  );

  const handleCLoseAlert = () => {
    dispatch(clearApiResponseState());
  };

  const errorMessage = useAppSelector(
    (state: RootState) => state.apiResponseReducer.errorMessage
  );
  const successMessage = useAppSelector(
    (state: RootState) => state.apiResponseReducer.successMessage
  );

  // The game

  const [openGameForm, setOpenGameForm] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const handleCloseGameForm = () => {
    setOpenGameForm(false);
  };
  const handleOpenGameForm = () => {
    setOpenGameForm(true);
  };

  const handleOpenGame = () => {
    setOpenGame(true);
  };

  const handleCloseGame = () => {
    dispatch(clearGameState());
    setOpenGame(false);
  };

  const userId = currentUser?.id;
  const { data } = useFetchSelect(userId!);

  useEffect(() => {
    dispatch(getTheme()); // Ensuring the theme will persist after the page reloads
    if (token) {
      // Ensuring the token and user persist on page reload
      dispatch(setToken(token));
      dispatch(setUser(user));
    }
  }, []);

  return (
    <CssBaseline>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<UserPage />} />
      </Routes>
      <ThemeButton />
      <Navbar
        showLogin={showLogin}
        showRegister={showRegister}
        showAddCard={showAddCard}
      />
      <Login
        open={openLogin}
        onClose={closeLogin}
        handleGoToRegister={goToRegister}
      />
      <Register
        open={openRegister}
        onClose={closeRegister}
        handleGoToLogin={goToLogin}
      />
      <AddCard open={openAddCard} onClose={closeAddCard} />
      <ErrorAlert
        error={errorMessage}
        open={openErrorAlert}
        handleClose={handleCLoseAlert}
      />
      <SuccessAlert
        success={successMessage}
        open={openSuccessAlert}
        handleClose={handleCLoseAlert}
      />
      <InitializeGameButton
        user={currentUser}
        openGameForm={handleOpenGameForm}
        openLoginForm={showLogin}
      />
      {openGameForm && (
        <GameForm
          open={openGameForm}
          handleClose={handleCloseGameForm}
          data={data}
          handleOpenGame={handleOpenGame}
        />
      )}
      {openGame && <Game open={openGame} handleClose={handleCloseGame} />}
    </CssBaseline>
  );
}

export default App;
