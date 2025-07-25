import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  Alert,
  Link,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingBag as ShoppingBagIcon,
  Forest as EcoIcon,
  LocalShipping as LocalShippingIcon,
  Redeem as RedeemIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { removeFromCart, updateCartQuantity } from '../../store/slices/commerceSlice';
import { mockProducts } from '../../mocks/data';

type Currency = 'USD' | 'V' | 'Y';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.commerce.cart);
  const [currency, setCurrency] = useState<Currency>('USD');

  // Calculate totals
  const { subtotal, shipping, ecoDiscount, total } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.product.price[currency] * item.quantity);
    }, 0);

    // Calculate shipping (free over certain amount)
    const freeShippingThreshold = currency === 'USD' ? 100 : currency === 'V' ? 100 : 75;
    const shipping = subtotal >= freeShippingThreshold ? 0 : (currency === 'USD' ? 10 : currency === 'V' ? 10 : 7);

    // Calculate eco-discount based on certifications
    const ecoDiscount = cartItems.reduce((discount, item) => {
      const certCount = item.product.certifications.length;
      const itemTotal = item.product.price[currency] * item.quantity;
      // 2% discount per certification, max 10%
      const discountRate = Math.min(certCount * 0.02, 0.1);
      return discount + (itemTotal * discountRate);
    }, 0);

    const total = subtotal + shipping - ecoDiscount;

    return { subtotal, shipping, ecoDiscount, total };
  }, [cartItems, currency]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    // Navigate to checkout page (to be implemented)
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/marketplace');
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Discover regenerative products that heal our planet
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingBagIcon />}
            onClick={handleContinueShopping}
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>

          {/* Suggested Products */}
          <Box sx={{ mt: 6, textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom>
              Suggested for You
            </Typography>
            <Grid spacing={3} sx={{ mt: 1 }}>
              {mockProducts.slice(0, 3).map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                  <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.images[0]}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6" noWrap>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price.USD}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          size="small"
                          icon={<EcoIcon />}
                          label={product.certifications[0]}
                          color="success"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleContinueShopping}
          sx={{ mb: 2 }}
        >
          Continue Shopping
        </Button>
        <Typography variant="h3" component="h1">
          Shopping Cart
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </Typography>
      </Box>

      <Grid spacing={3}>
        {/* Cart Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2 }}>
            {cartItems.map((item, index) => (
              <Box key={item.product.id}>
                {index > 0 && <Divider sx={{ my: 2 }} />}
                <Grid spacing={2}>
                  {/* Product Image */}
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Box
                      component="img"
                      src={item.product.images[0]}
                      alt={item.product.name}
                      sx={{
                        width: '100%',
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    />
                  </Grid>

                  {/* Product Details */}
                  <Grid size={{ xs: 12, sm: 9 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography
                          variant="h6"
                          component={Link}
                          href={`/product/${item.product.id}`}
                          sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                        >
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          by {item.product.seller}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => handleRemoveItem(item.product.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    {/* Certifications */}
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                      {item.product.certifications.slice(0, 3).map((cert) => (
                        <Chip
                          key={cert}
                          label={cert}
                          size="small"
                          icon={<EcoIcon />}
                          color="success"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Quantity Selector */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            handleQuantityChange(item.product.id, val);
                          }}
                          type="number"
                          size="small"
                          sx={{ width: 60 }}
                          inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* Price */}
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" color="text.secondary">
                          {item.product.price[currency]} {currency} × {item.quantity}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {(item.product.price[currency] * item.quantity).toFixed(2)} {currency}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>

            {/* Currency Selector */}
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                label="Currency"
              >
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="V">Verde (V)</MenuItem>
                <MenuItem value="Y">Yield (Y)</MenuItem>
              </Select>
            </FormControl>

            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Subtotal</Typography>
                <Typography>
                  {subtotal.toFixed(2)} {currency}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShippingIcon fontSize="small" />
                  <Typography>Shipping</Typography>
                </Box>
                <Typography>
                  {shipping === 0 ? 'FREE' : `${shipping.toFixed(2)} ${currency}`}
                </Typography>
              </Box>

              {shipping > 0 && (
                <Alert severity="info" sx={{ py: 0.5 }}>
                  <Typography variant="caption">
                    Free shipping on orders over {currency === 'USD' ? 100 : currency === 'V' ? 100 : 75} {currency}
                  </Typography>
                </Alert>
              )}

              {ecoDiscount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'success.main' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RedeemIcon fontSize="small" />
                    <Typography>Eco-Discount</Typography>
                  </Box>
                  <Typography>-{ecoDiscount.toFixed(2)} {currency}</Typography>
                </Box>
              )}

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  {total.toFixed(2)} {currency}
                </Typography>
              </Box>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>

            {/* Impact Summary */}
            <Paper variant="outlined" sx={{ p: 2, mt: 3, bgcolor: 'success.50' }}>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EcoIcon color="success" />
                Your Impact
              </Typography>
              <Typography variant="caption" display="block">
                This order supports {cartItems.reduce((sum, item) => sum + item.product.certifications.length, 0)} eco-certifications
              </Typography>
              <Typography variant="caption" display="block">
                Carbon offset: {cartItems.reduce((sum, item) => sum + (item.product.impact.carbonFootprint * item.quantity), 0).toFixed(1)} kg CO₂
              </Typography>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}