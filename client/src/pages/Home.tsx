import { Box, Container, TextField, Typography, useTheme } from "@mui/material";
import "../styles/pages/home.css";
import { useFetchCardsPublicCategoriesQuery } from "../redux/api/appApi";
import { useEffect, useState } from "react";
import { Select } from "../types/SelectType";
import CategoriesList from "../components/homepage/CategoriesList";

export default function Home() {
  const theme = useTheme();
  const { data } = useFetchCardsPublicCategoriesQuery(null);

  // Searching functionality

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Select[]>([]);

  useEffect(() => {
    const lowercasedInput = searchValue.toLowerCase();

    if (lowercasedInput === "") {
      setSearchResult(data);
    } else {
      if (data.length > 0) {
        setSearchResult(
          data.filter((elem: Select) =>
            elem.category.toLowerCase().startsWith(lowercasedInput)
          )
        );
      }
    }
  }, [searchValue, data]);

  function handleSearch(input: string) {
    setSearchValue(input);
  }

  return (
    <Container className="page-wrapper">
      <Box className="dashboard">
        <Box
          className="dashboard-header"
          sx={{ borderBottom: `1px solid ${theme.palette.primary.main}` }}
        >
          <Typography variant="h4">Public Categories</Typography>

          {/* the search bar */}

          <Box className="search-bar">
            <TextField
              id="outlined-basic"
              label="Find categories..."
              variant="outlined"
              className="search-input"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Box>
        </Box>
        {searchResult && (
          <>
            {searchResult.length > 0 ? (
              <CategoriesList categories={searchResult} />
            ) : (
              <CategoriesList categories={data} />
            )}
          </>
        )}
      </Box>
    </Container>
  );
}