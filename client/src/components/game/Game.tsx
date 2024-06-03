import { Box, Button, Modal } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import useCards from "../../hooks/useCards";
import { useAppSelector, useAppDispatch, RootState } from "../../redux/store";
import QuizCard from "../card-game/QuizCard";
import { Card } from "../../types/CardType";
import "../../styles/game/game.css";
import GameResult from "./GameResult";
import { clearGameState } from "../../redux/slices/gameSlice";
import { useState } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function Game({ open, handleClose }: Props) {
  const dispatch = useAppDispatch();

  const { category, limit } = useAppSelector(
    (state: RootState) => state.gameReducer
  );

  const data = useCards(category, limit);

  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
    dispatch(clearGameState());
  };

  return (
    <Modal open={open} onClose={handleClose} className="modal">
      <Box
        className="game-wrapper"
        sx={{ backgroundColor: "background.paper" }}
      >
        <Box className="game-header">
          <Button variant="outlined" color="error" onClick={handleClose}>
            <CloseSharpIcon />
          </Button>
        </Box>
        <Box className="game-questions-wrapper">
          {data &&
            data.map((card: Card, index: number) => (
              <QuizCard card={card} index={index + 1} key={card.id} />
            ))}
        </Box>
        <Button
          onClick={() => setOpenModal(true)}
          variant="outlined"
          color="success"
          size="large"
          className="finish-quiz-button"
        >
          Finish quiz
        </Button>
        <GameResult open={openModal} handleClose={closeModal} />
      </Box>
    </Modal>
  );
}
