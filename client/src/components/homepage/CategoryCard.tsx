import { Box, Typography } from "@mui/material";
import { Select } from "../../types/SelectType";

interface Props{
    category: Select;
}

export default function CategoryCard({category}:Props) {
    return(
        <Box sx={{backgroundColor: 'secondary.dark'}} className='category-card'>
            <Typography>{category.category} </Typography>
            <Typography color='text.secondary'>({category.count} questions)</Typography>
        </Box>
    )
}
