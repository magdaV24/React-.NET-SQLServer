import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RootState, useAppSelector } from "../../redux/store";

interface Props {
  open: boolean;
  handleClose: () => void;
}
export default function GameResult({ open, handleClose }: Props) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const points = useAppSelector((state: RootState) => state.gameReducer.points);
  const limit = useAppSelector((state: RootState) => state.gameReducer.limit);

  useEffect(() => {
    const handleMessage = () => {
      if (points < limit / 2) {
        setMessage(
          `This time you scored only ${points} points. Good luck next time!`
        );
        setImage("/svgs/small-score.svg");
      } else {
        setMessage(`Congratulations! You scored ${points} points!`);
        setImage("/svgs/big-score.svg");
      }
    };
    handleMessage();
  }, [points]);
  return (
    <Modal open={open} onClose={handleClose} className="modal">
      <Box
        className="game-result-wrapper"
        sx={{ backgroundColor: "primary.light" }}
      >
        <img
          src={image}
          alt="game-result-image"
          className="finish-game-image"
        />
        <Typography variant="h5">{message}</Typography>
      </Box>
    </Modal>
  );
}
