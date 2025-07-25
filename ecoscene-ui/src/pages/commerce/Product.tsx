import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Rating,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Breadcrumbs,
  Link,
  ImageList,
  ImageListItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  ShoppingCart,
  Favorite,
  Share,
  VerifiedUser,
  Forest as EcoOutlined,
  Nature,
  People,
  LocalShipping,
  NavigateNext,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/commerceSlice';
import { mockProducts } from '../../mocks/data';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'V' | 'Y'>('USD');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find product by ID (in real app, would fetch from API)
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    // In real app, would show success message
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCertificationIcon = (cert: string) => {
    if (cert.includes('Organic')) return <Nature />;
    if (cert.includes('Fair')) return <People />;
    return <VerifiedUser />;
  };

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          onClick={(e) => { e.preventDefault(); navigate('/marketplace'); }}
          sx={{ cursor: 'pointer' }}
        >
          Marketplace
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          onClick={(e) => { e.preventDefault(); }}
          sx={{ cursor: 'pointer' }}
        >
          {product.category}
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid spacing={3}>
        {/* Product Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </Box>
            {product.images.length > 1 && (
              <ImageList sx={{ height: 100 }} cols={4} gap={8}>
                {product.images.map((image, index) => (
                  <ImageListItem
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      border: selectedImage === index ? 2 : 0,
                      borderColor: 'primary.main',
                      borderRadius: 1,
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      loading="lazy"
                      style={{ borderRadius: 4 }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              by {product.seller}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>

            {/* Certifications */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {product.certifications.map((cert) => (
                <Chip
                  key={cert}
                  icon={getCertificationIcon(cert)}
                  label={cert}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            {/* Pricing */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                {selectedCurrency === 'USD' && `$${product.price.USD}`}
                {selectedCurrency === 'V' && `${product.price.V} V`}
                {selectedCurrency === 'Y' && `${product.price.Y} Y`}
              </Typography>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value as 'USD' | 'V' | 'Y')}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="V">V Currency</MenuItem>
                  <MenuItem value="Y">Y Currency</MenuItem>
                </Select>
              </FormControl>
            </Paper>

            {/* Quantity and Actions */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabel>Quantity</InputLabel>
                <Select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  label="Quantity"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                sx={{ flexGrow: 1 }}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <IconButton
                onClick={() => setIsWishlisted(!isWishlisted)}
                color={isWishlisted ? 'error' : 'default'}
              >
                <Favorite />
              </IconButton>
              
              <IconButton>
                <Share />
              </IconButton>
            </Box>

            {/* Impact Metrics */}
            <Paper sx={{ p: 2, bgcolor: 'rgba(46, 125, 50, 0.08)' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EcoOutlined /> Environmental Impact
              </Typography>
              <Grid spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Biodiversity Score
                  </Typography>
                  <Typography variant="h6">
                    {product.impact.biodiversityScore}/10
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Carbon Footprint
                  </Typography>
                  <Typography variant="h6" color={product.impact.carbonFootprint < 0 ? 'success.main' : 'text.primary'}>
                    {product.impact.carbonFootprint > 0 ? '+' : ''}{product.impact.carbonFootprint} kg CO₂
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body2" color="text.secondary">
                    Community Benefit
                  </Typography>
                  <Typography variant="body1">
                    {product.impact.communityBenefit}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Paper sx={{ mt: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Description" />
          <Tab label="Shipping & Returns" />
          <Tab label="Reviews" />
          <Tab label="Seller Info" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="100% Organic and Non-GMO" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sustainably sourced and packaged" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Supports regenerative farming practices" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Fair trade certified" />
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocalShipping />
              <Typography variant="h6">Shipping Information</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              We ship using carbon-neutral methods whenever possible. Standard shipping takes 5-7 business days.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Returns Policy
            </Typography>
            <Typography variant="body1">
              We accept returns within 30 days of purchase. Products must be in original condition. 
              Please contact our support team to initiate a return.
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Customer Reviews
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Rating value={product.rating} readOnly size="large" />
                <Typography variant="h5">{product.rating}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Based on {product.reviews} reviews
                </Typography>
              </Box>
              
              {/* Sample reviews */}
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={5} readOnly size="small" />
                        <Typography variant="subtitle2">Amazing quality!</Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          by earthlover22 - 2 weeks ago
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          These seeds produced the most beautiful tomatoes I've ever grown. 
                          The heritage varieties are truly special.
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ width: 60, height: 60 }}>{product.seller[0]}</Avatar>
              <Box>
                <Typography variant="h6">{product.seller}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Conscious Business Partner since 2020
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" paragraph>
              We are a cooperative of regenerative farmers dedicated to preserving heirloom varieties 
              and promoting biodiversity. All our products are grown using permaculture principles.
            </Typography>
            <Button variant="outlined" onClick={() => navigate('/marketplace')}>
              View All Products from {product.seller}
            </Button>
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
}