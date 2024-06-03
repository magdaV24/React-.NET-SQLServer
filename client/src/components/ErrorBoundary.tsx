import { Box, Button, Typography } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

export const ErrorBoundary: React.FC<FallbackProps> = ({
    error,
    resetErrorBoundary,
  }) =>{
 return(
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', gap: '3rem'}} className='page-wrapper'>
        <Typography variant="h2">Something went wrong!</Typography>
        <img
        src='svgs/error.svg'
        alt='error-svg'
        loading="lazy"
        className="error-svg"
      />
        <Typography variant="h5">{error.message}</Typography>
        <Button onClick={resetErrorBoundary}></Button>
    </Box>
 )   
}
