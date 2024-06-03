import { Box, Button, CircularProgress } from "@mui/material";
import { Card } from "../../types/CardType";
import AnswersGrid from "./AnswersGrid";
import CardHeader from "./CardHeader";
import { Options } from "../../types/OptionsType";
import { useDeleteCardMutation, appApi } from "../../redux/api/appApi";
import { useAppDispatch } from "../../redux/store";
import { useState } from "react";
import EditCard from "../../forms/EditCard";

interface Props {
  card: Card;
}
export default function CardWrapper({ card }: Props) {
  const options: Options[] = [
    { answer: card.answer, photo: card.answerPhoto },
    { answer: card.wrongAnswerOne, photo: card.wrongAnswerOnePhoto },
    { answer: card.wrongAnswerTwo, photo: card.wrongAnswerTwoPhoto },
    { answer: card.wrongAnswerThree, photo: card.wrongAnswerThreePhoto },
  ];

  //Deleting the card

  const dispatch = useAppDispatch();

  const [deleteCard, { isLoading: deleteLoading }] = useDeleteCardMutation();

  const submitDelete = () => {
    deleteCard(card.id);
    dispatch(appApi.util.resetApiState());
  };

  // Editing the card

  const [openEditForm, setOpenEditForm] = useState(false);

  const handleOpenEditForm = () => {
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(true);
  };

  return (
    <Box sx={{ backgroundColor: "secondary.light" }} className="card-wrapper">
      <Box>
        <CardHeader category={card.category} question={card.question} />
        <AnswersGrid options={options} />
      </Box>
      <Box className="buttons-box">
        <Button
          className="btn"
          size="large"
          variant="outlined"
          fullWidth
          color="info"
          onClick={handleOpenEditForm}
        >
          Edit Card
        </Button>
        {deleteLoading ? (
          <Button
            className="btn"
            color="error"
            variant="contained"
            size="large"
            disabled={true}
          >
            <CircularProgress />
          </Button>
        ) : (
          <Button
            className="btn"
            color="error"
            variant="contained"
            size="large"
            onClick={submitDelete}
          >
            Delete card
          </Button>
        )}
      </Box>
      <EditCard card={card} open={openEditForm} handleClose={handleCloseEditForm} />
    </Box>
  );
}
