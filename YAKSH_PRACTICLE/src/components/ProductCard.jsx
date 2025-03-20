import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 

const ProductCard = ({ product, addToCart, isInCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!token) {
      navigate('/login'); 
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
    }, 500);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 420,
        m: 2,
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer", 
      }}
      onClick={handleCardClick} 
    >
      <CardMedia
        component="img"
        height="250"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h8" gutterBottom>
          {product.title}
        </Typography>

        <div>
          {product.discountPercentage && (
            <Chip
              label={`-${product.discountPercentage}% Off`}
              color="success"
              sx={{ mb: 1 }}
            />
          )}
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            ${product.price}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={isInCart || isLoading}
          >
            {isInCart ? "In Cart" : isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;