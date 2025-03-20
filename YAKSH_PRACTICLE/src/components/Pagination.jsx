import React from 'react';
import { Pagination, Stack } from '@mui/material';

const CustomPagination = ({ page, count, onChange }) => {
  return (
    <Stack spacing={2} sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Pagination 
        count={count} 
        page={page} 
        onChange={onChange} 
        color="primary" 
      />
    </Stack>
  );
};

export default CustomPagination;