import { Box } from "@mui/material";
import { Options } from "../../types/OptionsType";
import AnswerWrapper from "./AnswerWrapper";

interface Props{
  options: Options[];
}

export default function AnswersGrid({options}:Props) {
  return (
    <Box className='answers-grid'>
      {options && options.map((option)=>(
        <AnswerWrapper answer={option.answer} photoURL={option.photo} key={Math.random()} />
      ))}
    </Box>
  );
}
