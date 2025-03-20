import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const CategoryFilter = ({ categories, selectedCategory, handleCategoryChange, searchTerm, setSearchTerm }) => (
  <>
    <div style={{display:"flex",gap:"20px"}}>
    <TextField
      fullWidth
      label="Search Product"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ mb: 3 }}
    />
    
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  
    </div>
  </>
);

export default CategoryFilter;