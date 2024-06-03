import { Box, FormControlLabel, Radio } from "@mui/material";
import { Options } from "../../types/OptionsType";
import '../../styles/components/quizCard.css'

interface Props {
  checked: string;
  disabled: boolean;
  option: Options;
  handleChangeValue: (input: Options) => void;
}

export default function AnswerSimple({
  option,
  checked,
  handleChangeValue,
  disabled,
}: Props) {
  return (
    <Box >
      <FormControlLabel
        value={option.answer}
        control={<Radio />}
        label={option.answer}
        disabled={disabled}
        checked={checked === option.answer}
        onChange={() => handleChangeValue(option)}
        className="game-answer-wrapper"
      />
    </Box>
  );
}
