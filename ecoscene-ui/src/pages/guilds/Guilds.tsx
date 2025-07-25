import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Container,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search as SearchIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Forest as EcoIcon,
  Group as GroupIcon,
  Agriculture as AgricultureIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  LocalFlorist as LocalFloristIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { mockGuilds, mockUsers } from '../../mocks/data';

const categories = [
  { value: 'all', label: 'All', icon: <CategoryIcon /> },
  { value: 'Agriculture', label: 'Agriculture', icon: <AgricultureIcon /> },
  { value: 'Community', label: 'Community', icon: <GroupIcon /> },
  { value: 'Environment', label: 'Environment', icon: <EcoIcon /> },
  { value: 'Wellness', label: 'Wellness', icon: <PsychologyIcon /> },
  { value: 'Education', label: 'Education', icon: <SchoolIcon /> },
];

export default function Guilds() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [myGuildsOnly, setMyGuildsOnly] = useState(false);

  // Get current user's guilds (mock data)
  const currentUser = mockUsers[0]; // Simulating logged-in user
  const myGuilds = currentUser.guilds;

  // Filter guilds based on search and category
  const filteredGuilds = useMemo(() => {
    return mockGuilds.filter((guild) => {
      const matchesSearch = guild.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guild.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guild.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || guild.category === selectedCategory;
      
      const matchesMyGuilds = !myGuildsOnly || myGuilds.includes(guild.name);
      
      return matchesSearch && matchesCategory && matchesMyGuilds;
    });
  }, [searchQuery, selectedCategory, myGuildsOnly, myGuilds]);

  const handleGuildClick = (guildId: string) => {
    navigate(`/guild/${guildId}`);
  };

  const handleCategoryChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Agriculture':
        return <AgricultureIcon fontSize="small" />;
      case 'Community':
        return <GroupIcon fontSize="small" />;
      case 'Environment':
        return <EcoIcon fontSize="small" />;
      case 'Wellness':
        return <PsychologyIcon fontSize="small" />;
      case 'Education':
        return <SchoolIcon fontSize="small" />;
      default:
        return <CategoryIcon fontSize="small" />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Guilds
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Join communities of changemakers working together to create regenerative impact
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search guilds by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Create Guild
          </Button>
        </Box>

        {/* Filter Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <Tab
                key={category.value}
                value={category.value}
                label={category.label}
                icon={category.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>

        {/* My Guilds Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant={myGuildsOnly ? 'contained' : 'outlined'}
            onClick={() => setMyGuildsOnly(!myGuildsOnly)}
            startIcon={<FavoriteIcon />}
          >
            My Guilds ({myGuilds.length})
          </Button>
          <Typography variant="body2" color="text.secondary">
            {filteredGuilds.length} guilds found
          </Typography>
        </Box>
      </Box>

      {/* Guild Cards Grid */}
      <Grid spacing={3}>
        {filteredGuilds.map((guild) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={guild.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => handleGuildClick(guild.id)}
            >
              {/* Guild Banner */}
              <CardMedia
                component="img"
                height="140"
                image={guild.banner}
                alt={`${guild.name} banner`}
                sx={{ position: 'relative' }}
              />
              
              {/* Guild Avatar */}
              <Box sx={{ position: 'relative', px: 2, pb: 1 }}>
                <Avatar
                  src={guild.avatar}
                  alt={guild.name}
                  sx={{
                    width: 80,
                    height: 80,
                    position: 'absolute',
                    top: -40,
                    border: '4px solid white',
                    boxShadow: 2,
                  }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, pt: 6 }}>
                {/* Guild Name and Category */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h6" component="h3">
                    {guild.name}
                  </Typography>
                  <Chip
                    icon={getCategoryIcon(guild.category)}
                    label={guild.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {guild.description}
                </Typography>

                {/* Stats */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {guild.members.toLocaleString()} members
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <WorkIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {guild.projects} projects
                    </Typography>
                  </Box>
                </Box>

                {/* Location */}
                {guild.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                    <LocationIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {guild.location}
                    </Typography>
                  </Box>
                )}

                {/* Tags */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {guild.tags.slice(0, 3).map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                  {guild.tags.length > 3 && (
                    <Chip
                      label={`+${guild.tags.length - 3}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  )}
                </Box>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant={myGuilds.includes(guild.name) ? 'outlined' : 'contained'}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle join/leave logic
                  }}
                >
                  {myGuilds.includes(guild.name) ? 'Member' : 'Join Guild'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredGuilds.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <LocalFloristIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No guilds found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search or filters, or create a new guild
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create First Guild
          </Button>
        </Paper>
      )}
    </Container>
  );
}