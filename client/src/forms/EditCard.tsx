import { Box, Modal } from "@mui/material";
import { Card } from "../types/CardType";
import "../styles/forms/editForm.css";
import EditField from "../components/edit-form/EditField";
import AnswerField from "../components/edit-form/AnswerField";
import EditPublic from "../components/edit-form/EditPublic";

interface Props {
  card: Card;
  open: boolean;
  handleClose: () => void;
}
export default function EditCard({ card, open, handleClose }: Props) {
  return (
    <Modal open={open} onClose={handleClose} className="modal">
      <Box
        sx={{ backgroundColor: "background.paper" }}
        className="edit-form-wrapper"
      >
        <EditField
          fieldValue={card!.category}
          cardId={card!.id}
          fieldName={"Category"}
        />
        <EditField
          fieldName={"Question"}
          cardId={card!.id}
          fieldValue={card!.question}
        />
        <AnswerField
          field={"Answer"}
          fieldValue={card!.answer}
          photo={card!.answerPhoto}
          photoField={"AnswerPhoto"}
          cardId={card!.id}
          fieldName={"Answer"}
        />
        <AnswerField
          field={"WrongAnswerOne"}
          fieldValue={card!.wrongAnswerOne}
          photo={card!.wrongAnswerOnePhoto}
          photoField={"WrongAnswerOnePhoto"}
          cardId={card!.id}
          fieldName={"Wrong Answer One"}
        />
        <AnswerField
          field={"WrongAnswerTwo"}
          fieldValue={card!.wrongAnswerTwo}
          photo={card!.wrongAnswerTwoPhoto}
          photoField={"WrongAnswerTwoPhoto"}
          cardId={card!.id}
          fieldName={"Wrong Answer Two"}
        />
        <AnswerField
          field={"WrongAnswerThree"}
          fieldValue={card!.wrongAnswerThree}
          photo={card!.wrongAnswerThreePhoto}
          photoField={"WrongAnswerThreePhoto"}
          cardId={card!.id}
          fieldName={"Wrong Answer Three"}
        />
        <EditPublic cardId={card!.id} value={card!.public} />
      </Box>
    </Modal>
  );
}
