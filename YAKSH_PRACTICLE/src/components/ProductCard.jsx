import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart, isInCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!token) {
      navigate("/login");
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
        maxWidth: 320,
        height: 460,
        m: 2,
        borderRadius: "20px",
        // boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        transition: "0.4s ease-in-out",
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.3)",
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="250"
        image={product.thumbnail}
        alt={product.title}
        sx={{
          objectFit: "contain",
          transition: "0.4s",
          padding: "10px",
          "&:hover": { transform: "scale(1.1)" },
        }}
      />
      <CardContent sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#222" }}>
          {product.title}
        </Typography>

        {product.discountPercentage && (
          <Chip
            label={`-${product.discountPercentage}%`}
            color="success"
            sx={{
              mb: 1,
              fontSize: "0.85rem",
              fontWeight: "bold",
              backgroundColor: "#ff4757",
              color: "#fff",
              borderRadius: "15px",
              px: 2,
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#007bff">
            ${product.price}
          </Typography>

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #007bff, #0056b3)",
              color: "#fff",
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              boxShadow: "0px 4px 10px rgba(0, 123, 255, 0.4)",
              width: "130px",
              "&:hover": {
                background: "linear-gradient(to right, #0056b3, #0046a3)",
                boxShadow: "0px 6px 15px rgba(0, 123, 255, 0.6)",
              },
            }}
            onClick={handleAddToCart}
            disabled={isInCart || isLoading}
          >
            {isLoading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : isInCart ? "In Cart" : "Add to Cart"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
