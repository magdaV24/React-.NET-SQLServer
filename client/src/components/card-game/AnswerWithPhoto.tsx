import { AdvancedImage } from "@cloudinary/react";
import { Box, Typography, Radio } from "@mui/material";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { cloudinaryFnc } from "../../utils/cloudinaryFnc";
import { Options } from "../../types/OptionsType";

interface Props {
  option: Options;
  disabled: boolean;
  selectedAnswer: Options;
  handleChangeValue: (input: Options) => void;
}

export default function AnswerWithPhoto({
  option,
  disabled,
  handleChangeValue,
  selectedAnswer,
}: Props) {
  const cld = cloudinaryFnc();
  return (
    <Box className="answer-wrapper">
      <Box className="radio-wrapper">
      <Radio
        value={option.answer}
        checked={
          selectedAnswer.answer === option.answer &&
          selectedAnswer.photo === option.photo
        }
        onChange={() => handleChangeValue(option)}
        disabled={disabled}
      />
      <Box className="answer-label">
        <Typography>{option.answer}</Typography>
      </Box>
      </Box>
      {option.photo && (
        <Box>
          <AdvancedImage
            cldImg={cld.image(option.photo).resize(fill().height(150))}
          />
        </Box>
      )}
    </Box>
  );
}
