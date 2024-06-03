import { Typography } from "@mui/material";

interface Props {
  category: string;
  question: string;
  index: number;
}

export default function Question({ category, question, index }: Props) {
  return (
    <Typography color="text.secondary" variant="h5" gutterBottom>
      {category} - Question {index}: {question}
    </Typography>
  );
}
