import React from 'react';
import { Pagination as MUIPagination } from '@mui/material';
import Box from '@mui/material/Box';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
    // go top when page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0',
        width: '100%',
      }}
    >
      <MUIPagination
        count={Math.min(totalPages, 500)} //some limit on the api (max pages or sum)
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        siblingCount={2}
      />
    </Box>
  );
};

export default Pagination;