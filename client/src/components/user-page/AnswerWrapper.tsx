import { Box, Typography } from "@mui/material";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { cloudinaryFnc } from "../../utils/cloudinaryFnc";
import { AdvancedImage } from "@cloudinary/react";

interface Props {
    answer: string;
    photoURL: string;
  }

export default function AnswerWrapper({ answer, photoURL }: Props) {
  const cld = cloudinaryFnc();
 return(
    <Box className="answer-wrapper">
         {(photoURL !== null) && <AdvancedImage
            cldImg={cld.image(photoURL).resize(fill().height(150))}
          />}
          <Typography className="answer">{answer}</Typography>
    </Box>
 )   
}
