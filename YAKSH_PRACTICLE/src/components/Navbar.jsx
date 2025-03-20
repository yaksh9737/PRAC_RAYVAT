import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../redux/actions/authActions';

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1E1E2F', padding: '12px 24px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Mobile Menu Button */}
        <IconButton edge="start" color="inherit" onClick={toggleMobileMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 'bold', textTransform: 'uppercase' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>E-Commerce</Link>
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '16px' }}>Home</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: 'white', fontSize: '16px' }}>Login</Link>
              <Link to="/register" style={{ textDecoration: 'none', color: 'white', fontSize: '16px' }}>Register</Link>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: 'white',
                fontSize: '16px',
                border: '1px solid white',
                padding: '6px 12px',
                '&:hover': { backgroundColor: '#39FF14', color: '#1E1E2F' }
              }}
            >
              Logout
            </Button>
          )}
          <Link to="/checkout" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton color="inherit">
              <Badge badgeContent={cartCount} sx={{ '& .MuiBadge-badge': { backgroundColor: '#0FF' } }}>
                <ShoppingCart sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
          </Link>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileMenu}>
        <Box sx={{ width: 250, padding: '20px', backgroundColor: '#1E1E2F', height: '100%' }}>
          <IconButton onClick={toggleMobileMenu} sx={{ color: 'white', marginBottom: '20px' }}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem button component={Link} to="/" onClick={toggleMobileMenu}>
              <ListItemText primary="Home" sx={{ color: 'white', fontSize: '16px' }} />
            </ListItem>
            {!isAuthenticated ? (
              <>
                <ListItem button component={Link} to="/login" onClick={toggleMobileMenu}>
                  <ListItemText primary="Login" sx={{ color: 'white', fontSize: '16px' }} />
                </ListItem>
                <ListItem button component={Link} to="/register" onClick={toggleMobileMenu}>
                  <ListItemText primary="Register" sx={{ color: 'white', fontSize: '16px' }} />
                </ListItem>
              </>
            ) : (
              <ListItem button onClick={() => { handleLogout(); toggleMobileMenu(); }}>
                <ListItemText primary="Logout" sx={{ color: 'white', fontSize: '16px' }} />
              </ListItem>
            )}
            <ListItem button component={Link} to="/checkout" onClick={toggleMobileMenu}>
              <Badge badgeContent={cartCount} sx={{ '& .MuiBadge-badge': { backgroundColor: '#0FF' } }}>
                <ShoppingCart sx={{ color: 'white' }} />
              </Badge>
              <ListItemText primary="Cart" sx={{ color: 'white', fontSize: '16px', marginLeft: '10px' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
  