import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Rating,
  Slider,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  Drawer,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Badge,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ShoppingCart as ShoppingCartIcon,
  Forest as EcoIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Nature as NatureIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/commerceSlice';
import { mockProducts } from '../../mocks/data';

const categories = [
  'All Categories',
  'Seeds & Plants',
  'Home & Living',
  'Health & Wellness',
  'Food & Beverages',
  'Clothing & Textiles',
  'Tools & Equipment',
  'Education & Books',
];

const certifications = [
  'USDA Organic',
  'Fair Trade',
  'B-Corp',
  'Regenerative Organic',
  'Non-GMO',
  'Carbon Neutral',
  'Women-Owned',
  'Handmade',
  'Wildcrafted',
];

export default function Marketplace() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products based on search, category, certifications, and price
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      const matchesCertifications = selectedCertifications.length === 0 ||
                                   selectedCertifications.some(cert => product.certifications.includes(cert));
      const matchesPrice = product.price.USD >= priceRange[0] && product.price.USD <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesCertifications && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedCertifications, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price.USD - b.price.USD);
      case 'price-high':
        return sorted.sort((a, b) => b.price.USD - a.price.USD);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'impact':
        return sorted.sort((a, b) => b.impact.biodiversityScore - a.impact.biodiversityScore);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const handleCertificationChange = (certification: string) => {
    setSelectedCertifications(prev =>
      prev.includes(certification)
        ? prev.filter(c => c !== certification)
        : [...prev, certification]
    );
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const FiltersContent = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      
      {/* Category Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Category
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Certification Filters */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Certifications
        </Typography>
        <FormGroup>
          {certifications.map(cert => (
            <FormControlLabel
              key={cert}
              control={
                <Checkbox
                  checked={selectedCertifications.includes(cert)}
                  onChange={() => handleCertificationChange(cert)}
                  size="small"
                />
              }
              label={<Typography variant="body2">{cert}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Price Range Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Price Range (USD)
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={200}
          marks={[
            { value: 0, label: '$0' },
            { value: 100, label: '$100' },
            { value: 200, label: '$200' },
          ]}
        />
      </Box>

      {/* Sort Options */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Sort By
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="featured">Featured</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
            <MenuItem value="impact">Impact Score</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );

  const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          by {product.seller}
        </Typography>
        
        {/* Price Display */}
        <Box sx={{ my: 2 }}>
          <Typography variant="h5" color="primary" component="span">
            ${product.price.USD}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
            / {product.price.V} V / {product.price.Y} Y
          </Typography>
        </Box>

        {/* Certifications */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {product.certifications.slice(0, 3).map(cert => (
            <Chip
              key={cert}
              label={cert}
              size="small"
              icon={<EcoIcon />}
              color="success"
              variant="outlined"
            />
          ))}
          {product.certifications.length > 3 && (
            <Chip
              label={`+${product.certifications.length - 3}`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        {/* Impact Metrics */}
        <Paper variant="outlined" sx={{ p: 1, mb: 2 }}>
          <Stack spacing={0.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <NatureIcon fontSize="small" color="success" />
              <Typography variant="caption">
                Biodiversity: {product.impact.biodiversityScore}/10
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUpIcon fontSize="small" color="info" />
              <Typography variant="caption">
                Carbon: {product.impact.carbonFootprint > 0 ? '+' : ''}{product.impact.carbonFootprint} kg CO₂
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <GroupsIcon fontSize="small" color="primary" />
              <Typography variant="caption" noWrap>
                {product.impact.communityBenefit}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Rating and Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({product.reviews})
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          fullWidth 
          variant="contained" 
          startIcon={<ShoppingCartIcon />}
          disabled={!product.inStock}
          onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Regenerative Marketplace
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover and support conscious businesses committed to healing our planet
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for eco-friendly products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: isMobile && (
              <InputAdornment position="end">
                <IconButton onClick={() => setMobileFiltersOpen(true)}>
                  <Badge badgeContent={selectedCertifications.length} color="primary">
                    <FilterListIcon />
                  </Badge>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarIcon color="primary" />
          Featured Products
        </Typography>
        <Grid spacing={3}>
          {sortedProducts.slice(0, 3).map(product => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Main Content */}
      <Grid spacing={3}>
        {/* Sidebar Filters - Desktop */}
        {!isMobile && (
          <Grid size={{ md: 3 }}>
            <Paper elevation={0} sx={{ position: 'sticky', top: 80 }}>
              <FiltersContent />
            </Paper>
          </Grid>
        )}

        {/* Product Grid */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {sortedProducts.length} products found
            </Typography>
            {!isMobile && (
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="impact">Impact Score</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>

          <Grid spacing={3}>
            {sortedProducts.map(product => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {sortedProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No products found matching your criteria
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="right"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Box sx={{ width: 300 }}>
          <FiltersContent />
        </Box>
      </Drawer>
    </Container>
  );
}