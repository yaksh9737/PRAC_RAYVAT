import React from 'react';
import { 
  FormControl, InputLabel, Select, MenuItem, 
  TextField, Box, Grid, Paper, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';

const CategoryFilter = ({ categories, selectedCategory, handleCategoryChange, searchTerm, setSearchTerm }) => (
  <Paper 
    elevation={3}
    sx={{ 
      background: "#FFFFFF", 
      padding: 3, 
      borderRadius: 3, 
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" 
    }}
  >
    <Grid container spacing={2} alignItems="center">
      
      {/* Search Field */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Search Product"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#1976D2" }} />
              </InputAdornment>
            )
          }}
          sx={{ 
            background: "#F9F9F9", 
            borderRadius: "8px",
            '& label': { color: "#666" },
            '& input': { color: "#333" },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: "#CCC" },
              '&:hover fieldset': { borderColor: "#1976D2" },
              '&.Mui-focused fieldset': { borderColor: "#1976D2" }
            }
          }}
        />
      </Grid>
      
      {/* Category Selector */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            displayEmpty
            startAdornment={
              <InputAdornment position="start">
                <CategoryIcon sx={{ color: "#1976D2" }} />
              </InputAdornment>
            }
            sx={{
              background: "#F9F9F9",
              borderRadius: "8px",
              '& .MuiOutlinedInput-notchedOutline': { borderColor: "#CCC" },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: "#1976D2" },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: "#1976D2" },
              '& .MuiSelect-select': { color: "#333" }
            }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    
    </Grid>
  </Paper>
);

export default CategoryFilter;
