import { Grid } from "@mui/material";
import { useMemo } from "react";
import { Options } from "../../types/OptionsType";
import AnswerSimple from "./AnswerSimple";
import AnswerWithPhoto from "./AnswerWithPhoto";
import "../../styles/components/quizCard.css";

interface Props {
  checked: string;
  disabled: boolean;
  options: Options[];
  selectedAnswer: Options;
  handleChangeValue: (input: Options) => void;
}
export default function AnswersGrid({
  options,
  handleChangeValue,
  checked,
  disabled,
  selectedAnswer,
}: Props) {
  // Shuffling the 4 possible answers, so that the correct one will not always be the first one
  const index = useMemo(() => [0, 1, 2, 3], []);
  const shuffle = (array: Array<number>) => {
    let x = array.length;
    let random;

    while (x !== 0) {
      random = Math.floor(Math.random() * x);
      x -= 1;

      [array[x], array[random]] = [array[random], array[x]];
    }

    return array;
  };
  const i = useMemo(() => shuffle(index), [index]);

  return (
    <Grid className="answers-grid">
      {[0, 1, 2, 3].map((x) => (
        <Grid item xs={6} key={x}>
          {options[i[x]].photo === null ? (
            <AnswerSimple
              checked={checked}
              disabled={false}
              option={options[i[x]]}
              handleChangeValue={handleChangeValue}
            />
          ) : (
            <AnswerWithPhoto
              option={options[i[x]]}
              disabled={disabled}
              selectedAnswer={selectedAnswer}
              handleChangeValue={handleChangeValue}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
