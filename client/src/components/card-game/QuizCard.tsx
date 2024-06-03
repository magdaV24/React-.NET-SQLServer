import { Box, Button, Divider } from "@mui/material";
import { Card } from "../../types/CardType";
import Question from "./Question";
import "../../styles/components/quizCard.css";
import AnswersGrid from "./AnswersGrid";
import { useState } from "react";
import { Options } from "../../types/OptionsType";
import { useAppDispatch } from "../../redux/store";
import { incrementPoints } from "../../redux/slices/gameSlice";

interface Props {
  card: Card;
  index: number;
}

export default function QuizCard({ card, index }: Props) {

const dispatch = useAppDispatch();
  const options: Options[] = [
    { answer: card.answer, photo: card.answerPhoto },
    { answer: card.wrongAnswerOne, photo: card.wrongAnswerOnePhoto },
    { answer: card.wrongAnswerTwo, photo: card.wrongAnswerTwoPhoto },
    { answer: card.wrongAnswerThree, photo: card.wrongAnswerThreePhoto },
  ];
  //
  const [selectedAnswer, setSelectedAnswer] = useState<Options>({
    answer: "",
    photo: "",
  });
  const [photo, setPhoto] = useState("");
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [bgCol, setBgCol] = useState("primary.dark")
  const handleChangeValue = (input: Options) => {
    setValue(input.answer);
    setChecked(input.answer);
    if (input.photo !== "") {
      setPhoto(input.photo);
      const temp: Options = { answer: value, photo: photo };
      setSelectedAnswer(temp);
    }
  };
  const onSubmit = () => {
    setDisabled(true);
    if (checked === card.answer && photo === card.answerPhoto) {
      dispatch(incrementPoints());
      setBgCol("success.dark")
    } else {
      setBgCol("error.dark")
    }
  };

  return (
    <Box className="quiz-card-wrapper" sx={{ backgroundColor: bgCol }}>
      <Question
        index={index}
        question={card.question}
        category={card.category}
      />
      <Divider />
      <AnswersGrid
        options={options}
        handleChangeValue={handleChangeValue}
        checked={checked}
        disabled={disabled}
        selectedAnswer={selectedAnswer}
      />
      <Divider/>
      <Button onClick={onSubmit} className="save-answer-button" variant="contained" color="secondary">Save Answer</Button>
    </Box>
  );
}
