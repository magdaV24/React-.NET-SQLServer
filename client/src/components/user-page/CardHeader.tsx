import { Typography } from "@mui/material";

interface Props {
    category: string;
    question: string;
  }
  
export default function CardHeader({category, question}:Props) {
    return(
        <Typography color="text.secondary" variant="h5" gutterBottom>
      {category} - {question}
    </Typography> 
    )
}
