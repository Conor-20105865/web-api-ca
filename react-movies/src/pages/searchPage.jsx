import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../hooks/useMovie";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../components/pagination";
import MovieList from "../components/movieList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import { debounce } from "lodash";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(query);
  
  const { data, error, isPending } = useSearch(query, page);

  // Debounce stop api over calling
  const debouncedSearch = debounce((term) => {
    setSearchParams({ q: term, page: "1" });
  }, 500);

 
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ q: query, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Group results by type
  const movieResults = data?.results?.filter(item => item.media_type === "movie") || [];
  const personResults = data?.results?.filter(item => item.media_type === "person") || [];

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies, actors, or directors..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {isPending && <Spinner />}

      {error && (
        <Typography color="error" variant="h6">
          {error.message}
        </Typography>
      )}

      {data && (
        <>
          {movieResults.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Movies
              </Typography>
              <MovieList movies={movieResults} />
            </Box>
          )}

          {personResults.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                People
              </Typography>
              <Grid container spacing={3}>
                {personResults.map((person) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={person.id}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.02)' }
                      }}
                      onClick={() => navigate(`/actors/${person.id}`)}
                    >
                      <CardMedia
                        component="img"
                        height="300"
                        image={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                            : "/placeholder.png"
                        }
                        alt={person.name}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {person.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Known for: {person.known_for_department}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {data.total_pages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                currentPage={page}
                totalPages={data.total_pages}
                onPageChange={handlePageChange}
              />
            </Box>
          )}

          {data.results.length === 0 && query && (
            <Typography variant="h6" align="center">
              No results found for "{query}"
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchPage;