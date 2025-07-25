import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Rating,
  Avatar,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Badge,
  IconButton,
  Tooltip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Schedule as ScheduleIcon,
  SignalCellularAlt as LevelIcon,
  Person as PersonIcon,
  PlayCircleOutline as PlayIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '../../mocks/data';

const categories = [
  'All',
  'Agriculture',
  'Wellness',
  'Environment',
  'Community',
  'Technology',
  'Business',
  'Sustainability',
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function Courses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [tabValue, setTabValue] = useState(0);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>([]);

  // Filter courses based on search, category, and level
  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  // Get enrolled courses (for demonstration, using first 3 courses)
  const enrolledCourses = mockCourses.slice(0, 3);

  // Get featured courses (for demonstration, using courses with rating > 4.5)
  const featuredCourses = mockCourses.filter(course => course.rating >= 4.5).slice(0, 4);

  const handleBookmark = (courseId: number) => {
    setBookmarkedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const CourseCard = ({ course, isEnrolled = false }: { course: any; isEnrolled?: boolean }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {course.featured && (
        <Chip
          icon={<TrendingIcon />}
          label="Featured"
          color="secondary"
          size="small"
          sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}
        />
      )}
      <IconButton
        sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1, bgcolor: 'background.paper' }}
        onClick={() => handleBookmark(course.id)}
      >
        {bookmarkedCourses.includes(course.id) ? <BookmarkedIcon /> : <BookmarkIcon />}
      </IconButton>
      
      <CardMedia
        component="img"
        height="200"
        image={course.image}
        alt={course.title}
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate(`/learning/course/${course.id}`)}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3" noWrap>
          {course.title}
        </Typography>
        
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Avatar sx={{ width: 24, height: 24 }} src={course.instructor.avatar}>
            {course.instructor.fullName[0]}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {course.instructor.fullName}
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <ScheduleIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {course.duration}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <LevelIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {course.level}
            </Typography>
          </Stack>
        </Stack>
        
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Rating value={course.rating} readOnly size="small" precision={0.1} />
          <Typography variant="body2" color="text.secondary">
            {course.rating} ({course.students?.toLocaleString() || 0} students)
          </Typography>
        </Stack>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {course.modules} modules • {course.modules * 3} lessons
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
          {course.tags.slice(0, 3).map((tag: string, index: number) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
        
        {!isEnrolled && (
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              ${course.price.USD}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or {course.price.V} V / {course.price.Y} Y
            </Typography>
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        {isEnrolled ? (
          <Button 
            fullWidth 
            variant="contained" 
            startIcon={<PlayIcon />}
            onClick={() => navigate(`/learning/course/${course.id}`)}
          >
            Continue Learning
          </Button>
        ) : (
          <Button 
            fullWidth 
            variant="outlined"
            onClick={() => navigate(`/learning/course/${course.id}`)}
          >
            View Course
          </Button>
        )}
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Learning Hub
      </Typography>
      
      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search courses..."
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
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select
                value={selectedLevel}
                label="Level"
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        {/* Category Chips */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="All Courses" />
          <Tab 
            label={
              <Badge badgeContent={enrolledCourses.length} color="primary">
                My Courses
              </Badge>
            } 
          />
          <Tab label="Featured" />
        </Tabs>
      </Box>
      
      {/* Course Content */}
      {tabValue === 0 && (
        <React.Fragment>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {filteredCourses.length} courses found
          </Typography>
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
      
      {tabValue === 1 && (
        <React.Fragment>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            My Enrolled Courses
          </Typography>
          <Grid container spacing={3}>
            {enrolledCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} isEnrolled />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
      
      {tabValue === 2 && (
        <React.Fragment>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Featured Courses
          </Typography>
          <Grid container spacing={3}>
            {featuredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </Container>
  );
}