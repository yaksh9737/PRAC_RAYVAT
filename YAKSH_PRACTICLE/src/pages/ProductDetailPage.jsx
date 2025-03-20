import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  TextField,
  Chip,
} from "@mui/material";
import { ShoppingCart, Star } from "@mui/icons-material";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const product = useSelector((state) =>
    state.products.products.find((product) => product.id.toString() === id)
  );
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const initialQuantity =
    cartItems.find((item) => item.id.toString() === id)?.quantity || 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleAddToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
  };

  if (!product) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        Product not found.
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 800,
        m: "auto",
        mt: 5,
        p: 3,
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        height="350"
        image={product.thumbnail}
        alt={product.title}
        sx={{
          objectFit: "contain",
          transition: "0.4s",
          borderRadius: "15px",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#222" }}>
          {product.title}
        </Typography>

        <Chip
          icon={<Star sx={{ color: "#FFD700" }} />}
          label={`${product.rating} / 5.0`}
          sx={{
            background: "#FFD700",
            color: "#222",
            fontWeight: "bold",
            mt: 1,
            px: 2,
            borderRadius: "8px",
          }}
        />

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, fontSize: "1rem", lineHeight: "1.6" }}
        >
          {product.description}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography>
            <strong>Brand:</strong> {product.brand}
          </Typography>
          <Typography>
            <strong>Category:</strong> {product.category}
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="#007bff">
            ${product.price}
          </Typography>
          <Typography>
            <strong>Stock:</strong> {product.stock}
          </Typography>
          <Typography>
            <strong>Availability:</strong> {product.availabilityStatus}
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Reviews:</Typography>
          <List>
            {product.reviews.map((review, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        {review.reviewerName}
                        <Rating
                          value={review.rating}
                          readOnly
                          precision={0.5}
                          sx={{ ml: 1 }}
                        />
                      </>
                    }
                    secondary={review.comment}
                  />
                </ListItem>
                {index < product.reviews.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1, max: product.stock }}
            sx={{
              width: "100px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              background: "linear-gradient(to right, #007bff, #0056b3)",
              color: "#fff",
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              boxShadow: "0px 4px 15px rgba(0, 123, 255, 0.4)",
              width: "160px",
              "&:hover": {
                background: "linear-gradient(to right, #0056b3, #0046a3)",
                boxShadow: "0px 6px 20px rgba(0, 123, 255, 0.6)",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductDetailPage;
