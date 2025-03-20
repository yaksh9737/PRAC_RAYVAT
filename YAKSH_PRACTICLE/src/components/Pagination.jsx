import React from 'react';
import { Pagination, Stack, Box } from '@mui/material';

const CustomPagination = ({ page, count, onChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Stack
        spacing={2}
        sx={{
          background: "#FFFFFF",
          padding: "12px 24px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Pagination
          count={count}
          page={page}
          onChange={onChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              transition: "0.3s ease",
              "&:hover": {
                backgroundColor: "#1976D2",
                color: "#fff",
              },
            },
            "& .Mui-selected": {
              backgroundColor: "#1976D2 !important",
              color: "#fff !important",
              fontWeight: "bold",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default CustomPagination;
