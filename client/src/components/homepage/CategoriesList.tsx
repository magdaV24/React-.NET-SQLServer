import { Box } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { Select } from "../../types/SelectType";

interface Props {
  categories: Select[];
}

export default function CategoriesList({ categories }: Props) {
  return (
    <Box className="categories-grid">
      {(categories && categories.length > 0) &&
        categories.map((category) => <CategoryCard category={category} key={Math.random()}/>)}
    </Box>
  );
}
