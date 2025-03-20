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
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
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
    return <Typography color="error">Product not found.</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 600, m: "auto", mt: 5, p: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="300"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h4">{product.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography>
            <strong>Brand:</strong> {product.brand}
          </Typography>
          <Typography>
            <strong>Category:</strong> {product.category}
          </Typography>
          <Typography>
            <strong>Price:</strong> ${product.price}
          </Typography>
          <Typography>
            <strong>Stock:</strong> {product.stock}
          </Typography>
          <Typography>
            <strong>Availability:</strong> {product.availabilityStatus}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
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
            mt: 2,
          }}
        >
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1, max: product.stock }}
            sx={{ width: "100px" }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductDetailPage;
