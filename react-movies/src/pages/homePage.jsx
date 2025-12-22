import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { useMovies } from '../hooks/useMovie';

const HomePage = () => {
  const [filters, setFilters] = useState({
    sortBy: "popularity.desc",
    year: "",
    rating: "",
    genre: "0",
    page: 1
  });

  const { data, error, isPending, isError } = useMovies(filters);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value,
      // Reset to page 1 when filters change (except for page change)
      page: type === "page" ? value : 1
    }));
  };

  const handlePageChange = (newPage) => {
    handleFilterChange("page", newPage);
  };

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
      currentPage={filters.page}
      totalPages={data.total_pages}
      onPageChange={handlePageChange}
      sortFilter={filters.sortBy}
      yearFilter={filters.year}
      ratingFilter={filters.rating}
      genreFilter={filters.genre}
      onUserInput={handleFilterChange}
    />
  );

};

export default HomePage;
