import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { Add, Remove, ShoppingCart, Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ showAlert }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  const handleQuantityChange = (itemId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change),
    }));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (quantities[item.id] || 1),
    0
  );

  const handleCheckout = () => {
    if (!paymentMethod) {
      showAlert("Please select a payment method.", "error");
      return;
    }

    showAlert(
      `Order Placed Successfully via ${
        paymentMethod === "cash" ? "Cash on Delivery" : "Debit Card"
      }!`,
      "success"
    );
    dispatch({ type: "CLEAR_CART" });
    setOpenDialog(false);
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>

      <List>
        {cartItems.map((item) => (
          <div key={item.id}>
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <ListItemAvatar>
                <Avatar
                  src={item.thumbnail}
                  alt={item.title}
                  sx={{ width: 56, height: 56, borderRadius: 2 }}
                />
              </ListItemAvatar>

              <ListItemText
                primary={<Typography fontWeight="bold">{item.title}</Typography>}
                secondary={`Price: $${item.price}`}
              />

              {/* Quantity Control */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "12px",
                  bgcolor: "#f5f5f5",
                  p: 0.5,
                }}
              >
                <IconButton
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={quantities[item.id] <= 1}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{quantities[item.id] || 1}</Typography>
                <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                  <Add />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      <Typography variant="h6" sx={{ mt: 3 }}>
        <strong>Total:</strong> ${totalAmount.toFixed(2)}
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          sx={{ flex: 1 }}
          onClick={() => dispatch({ type: "CLEAR_CART" })}
        >
          Clear Cart
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          sx={{ flex: 1 }}
          onClick={() => setOpenDialog(true)}
        >
          Proceed to Payment
        </Button>
      </Box>

      {/* Payment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Cash on Delivery"
            />
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Debit Card"
            />
          </RadioGroup>

          {paymentMethod === "card" && (
            <TextField
              label="Card Number"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCheckout} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CheckoutPage;
