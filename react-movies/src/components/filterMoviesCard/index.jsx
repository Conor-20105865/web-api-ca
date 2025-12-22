import React from "react";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'

const formControl = {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
};

const sortOptions = [
    { id: "popularity.desc", name: "Popularity (High to Low)" },
    { id: "popularity.asc", name: "Popularity (Low to High)" },
    { id: "vote_average.desc", name: "Rating (High to Low)" },
    { id: "vote_average.asc", name: "Rating (Low to High)" },
    { id: "release_date.desc", name: "Release Date (Newest)" },
    { id: "release_date.asc", name: "Release Date (Oldest)" },
];

const yearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { id: year.toString(), name: year.toString() };
});

export default function FilterMoviesCard(props) {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    
    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const handleChange = (e, type, value) => {
        props.onUserInput(type, value);
    };

    const handleTextChange = (e) => {
        handleChange(e, "name", e.target.value);
    };

    
    const handleSortChange = (e) => {
        handleChange(e, "sortBy", e.target.value);
    };

    const handleYearChange = (e) => {
        handleChange(e, "year", e.target.value);
    };

    const handleRatingChange = (e) => {
        handleChange(e, "rating", e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };



    return (
        <Card sx={{ backgroundColor: "white", boxShadow: 2, borderRadius: 2 }} variant="outlined">
                <CardContent sx={{ p: 2 }}>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter and Sort Movies
                </Typography>
                    <TextField
                        sx={{ ...formControl }}
                        id="filled-search"
                        label="Search by title"
                        type="search"
                        variant="outlined"
                        value={props.titleFilter}
                        onChange={handleTextChange}
                    />
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        label="Genre"
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        label="Sort By"
                        value={props.sortFilter}
                        onChange={handleSortChange}
                    >
                        {sortOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="year-label">Release Year</InputLabel>
                    <Select
                        labelId="year-label"
                        id="year-select"
                        label="Release Year"
                        value={props.yearFilter}
                        onChange={handleYearChange}
                    >
                        <MenuItem value="">All Years</MenuItem>
                        {yearOptions.map((year) => (
                            <MenuItem key={year.id} value={year.id}>
                                {year.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="rating-label">Minimum Rating</InputLabel>
                    <Select
                        labelId="rating-label"
                        id="rating-select"
                        label="Minimum Rating"
                        value={props.ratingFilter}
                        onChange={handleRatingChange}
                    >
                        <MenuItem value="">Any Rating</MenuItem>
                        {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
                            <MenuItem key={rating} value={rating}>
                                {rating}+ Stars
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </CardContent>
            <CardMedia
                sx={{ height: 300 }}
                image={img}
                title="Filter"
            />
        </Card>
    );
}
