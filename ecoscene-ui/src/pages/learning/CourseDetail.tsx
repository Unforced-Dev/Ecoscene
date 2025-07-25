import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Rating,
  Avatar,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Paper,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Schedule as ScheduleIcon,
  SignalCellularAlt as LevelIcon,
  Language as LanguageIcon,
  CheckCircle as CheckIcon,
  PlayCircleOutline as PlayIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
  Share as ShareIcon,
  ThumbUp as ThumbUpIcon,
  AssignmentTurnedIn as CertificateIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon,
  OndemandVideo as VideoIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { mockCourses } from '../../mocks/data';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CourseDetail() {
  const { courseId } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | false>(false);

  // Find course by id (for demo, using first course if id not found)
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];

  // Mock data for course modules and lessons
  const modules = [
    {
      id: 'module1',
      title: 'Introduction to Sustainable Agriculture',
      lessons: [
        { id: 'lesson1', title: 'What is Sustainable Agriculture?', duration: '15 min', type: 'video', completed: true },
        { id: 'lesson2', title: 'History and Evolution', duration: '20 min', type: 'article', completed: true },
        { id: 'lesson3', title: 'Key Principles', duration: '25 min', type: 'video', completed: false },
        { id: 'lesson4', title: 'Quiz: Introduction', duration: '10 min', type: 'quiz', completed: false },
      ]
    },
    {
      id: 'module2',
      title: 'Soil Health and Management',
      lessons: [
        { id: 'lesson5', title: 'Understanding Soil Composition', duration: '30 min', type: 'video', completed: false },
        { id: 'lesson6', title: 'Soil Testing Methods', duration: '25 min', type: 'article', completed: false },
        { id: 'lesson7', title: 'Improving Soil Fertility', duration: '35 min', type: 'video', completed: false },
        { id: 'lesson8', title: 'Quiz: Soil Management', duration: '15 min', type: 'quiz', completed: false },
      ]
    },
    {
      id: 'module3',
      title: 'Water Conservation Techniques',
      lessons: [
        { id: 'lesson9', title: 'Efficient Irrigation Systems', duration: '40 min', type: 'video', completed: false },
        { id: 'lesson10', title: 'Rainwater Harvesting', duration: '30 min', type: 'article', completed: false },
        { id: 'lesson11', title: 'Drought Management', duration: '25 min', type: 'video', completed: false },
      ]
    },
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent course! The instructor explains complex concepts in a very clear and practical way. I\'ve already started implementing some techniques on my farm.',
      helpful: 23,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '/api/placeholder/40/40',
      rating: 4,
      date: '1 month ago',
      comment: 'Very informative and well-structured. The only reason I\'m not giving 5 stars is that I wish there were more hands-on demonstrations.',
      helpful: 15,
    },
    {
      id: 3,
      name: 'Emma Davis',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      date: '2 months ago',
      comment: 'This course transformed my approach to farming. The water conservation module alone saved me thousands of dollars!',
      helpful: 42,
    },
  ];

  const handleModuleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedModule(isExpanded ? panel : false);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <VideoIcon />;
      case 'article': return <ArticleIcon />;
      case 'quiz': return <QuizIcon />;
      default: return <PlayIcon />;
    }
  };

  const calculateProgress = () => {
    const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = modules.reduce((acc, module) => 
      acc + module.lessons.filter(lesson => lesson.completed).length, 0
    );
    return (completedLessons / totalLessons) * 100;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Course Header */}
      <Grid spacing={4} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {course.description}
            </Typography>
            
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating value={course.rating} readOnly precision={0.1} />
                <Typography variant="body1">
                  {course.rating} ({course.students?.toLocaleString() || 0} students)
                </Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 32, height: 32 }} src={course.instructor.avatar}>
                  {course.instructor.fullName[0]}
                </Avatar>
                <Typography variant="body1">
                  Created by {course.instructor.fullName}
                </Typography>
              </Stack>
            </Stack>
            
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip icon={<ScheduleIcon />} label={course.duration} />
              <Chip icon={<LevelIcon />} label={course.level} />
              <Chip icon={<LanguageIcon />} label="English" />
              <Chip icon={<CertificateIcon />} label="Certificate of Completion" />
            </Stack>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => setIsBookmarked(!isBookmarked)}>
                {isBookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ position: 'sticky', top: 80 }}>
            <CardMedia
              component="img"
              height="200"
              image={course.image}
              alt={course.title}
            />
            <CardContent>
              <Typography variant="h4" color="primary" gutterBottom>
                ${course.price.USD}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                or {course.price.V} V / {course.price.Y} Y
              </Typography>
              
              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                sx={{ mb: 2 }}
                startIcon={<PlayIcon />}
              >
                Enroll Now
              </Button>
              
              <Typography variant="subtitle2" gutterBottom>
                This course includes:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <VideoIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary="24 hours of video content" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <ArticleIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary="15 articles and resources" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <QuizIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary="8 practice quizzes" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CertificateIcon color="action" />
                  </ListItemIcon>
                  <ListItemText primary="Certificate of completion" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Course Content Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(_e, newValue) => setTabValue(newValue)}>
          <Tab label="Overview" />
          <Tab label="Curriculum" />
          <Tab label="Instructor" />
          <Tab label="Reviews" />
        </Tabs>
      </Box>
      
      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5" gutterBottom>
              What you'll learn
            </Typography>
            <Grid spacing={2} sx={{ mb: 4 }}>
              {[
                'Implement sustainable farming practices to increase yield',
                'Understand soil health and management techniques',
                'Design efficient water conservation systems',
                'Apply organic pest control methods',
                'Create crop rotation plans for maximum productivity',
                'Build and maintain composting systems',
              ].map((outcome, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Stack direction="row" spacing={1}>
                    <CheckIcon color="success" />
                    <Typography variant="body1">{outcome}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="h5" gutterBottom>
              Requirements
            </Typography>
            <List sx={{ mb: 4 }}>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary="Basic understanding of agriculture concepts" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary="Access to a small plot of land for practice (optional)" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary="Enthusiasm for sustainable farming practices" />
              </ListItem>
            </List>
            
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              This comprehensive course on sustainable agriculture is designed for farmers, gardeners, 
              and anyone interested in learning environmentally-friendly farming practices. Through a 
              combination of video lectures, practical demonstrations, and real-world case studies, 
              you'll gain the knowledge and skills needed to implement sustainable farming techniques 
              that increase productivity while protecting the environment.
            </Typography>
            <Typography variant="body1" paragraph>
              The course covers everything from soil health and water conservation to organic pest 
              control and crop rotation strategies. You'll learn from experienced farmers who have 
              successfully implemented these practices on their own farms, and you'll have the 
              opportunity to apply what you learn through hands-on assignments and projects.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Course Statistics
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Completion Rate
                    </Typography>
                    <Typography variant="body1">89%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={89} sx={{ mt: 1 }} />
                </Box>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Average Rating
                  </Typography>
                  <Typography variant="body1">{course.rating}/5.0</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                  <Typography variant="body1">{course.students?.toLocaleString() || 0}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1">March 2024</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      
      {/* Curriculum Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Course Content
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {modules.length} modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons • {course.duration}
          </Typography>
          <LinearProgress variant="determinate" value={calculateProgress()} sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary">
            {calculateProgress().toFixed(0)}% complete
          </Typography>
        </Box>
        
        {modules.map((module) => (
          <Accordion 
            key={module.id}
            expanded={expandedModule === module.id}
            onChange={handleModuleChange(module.id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ flexGrow: 1 }}>{module.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                  {module.lessons.filter(l => l.completed).length}/{module.lessons.length} completed
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {module.lessons.map((lesson, index) => (
                  <React.Fragment key={lesson.id}>
                    {index > 0 && <Divider />}
                    <ListItem
                      sx={{
                        bgcolor: lesson.completed ? 'action.selected' : 'transparent',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <ListItemIcon>
                        {lesson.completed ? (
                          <CheckIcon color="success" />
                        ) : (
                          getLessonIcon(lesson.type)
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        secondary={`${lesson.type} • ${lesson.duration}`}
                      />
                      <Button size="small">
                        {lesson.completed ? 'Review' : 'Start'}
                      </Button>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </TabPanel>
      
      {/* Instructor Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                src={course.instructor.avatar}
                sx={{ width: 120, height: 120 }}
              >
                {course.instructor.fullName[0]}
              </Avatar>
              <Typography variant="h5">{course.instructor.fullName}</Typography>
              <Typography variant="body1" color="text.secondary">
                Sustainable Agriculture Expert
              </Typography>
              <Stack direction="row" spacing={2}>
                <Stack alignItems="center">
                  <Typography variant="h6">4.8</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instructor Rating
                  </Typography>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack alignItems="center">
                  <Typography variant="h6">12</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Courses
                  </Typography>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack alignItems="center">
                  <Typography variant="h6">45K</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Students
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h6" gutterBottom>
              About the Instructor
            </Typography>
            <Typography variant="body1" paragraph>
              Dr. {course.instructor.fullName} is a renowned expert in sustainable agriculture with over 20 years 
              of experience in the field. She holds a Ph.D. in Agricultural Sciences from Cornell 
              University and has worked with farmers across the globe to implement sustainable 
              farming practices.
            </Typography>
            <Typography variant="body1" paragraph>
              As the founder of Green Fields Initiative, she has helped transform over 10,000 
              farms into sustainable operations, increasing their productivity while reducing 
              environmental impact. Her research on soil health and water conservation has been 
              published in numerous scientific journals.
            </Typography>
            <Typography variant="body1" paragraph>
              Dr. {course.instructor.fullName} is passionate about education and has been teaching online courses 
              for the past 5 years, reaching students in over 150 countries. Her teaching style 
              combines scientific rigor with practical, hands-on approaches that make complex 
              concepts accessible to everyone.
            </Typography>
          </Grid>
        </Grid>
      </TabPanel>
      
      {/* Reviews Tab */}
      <TabPanel value={tabValue} index={3}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Student Reviews
          </Typography>
          <Grid spacing={4} alignItems="center" sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Stack alignItems="center">
                <Typography variant="h2" color="primary">
                  {course.rating}
                </Typography>
                <Rating value={course.rating} readOnly size="large" precision={0.1} />
                <Typography variant="body1" color="text.secondary">
                  Course Rating
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Stack spacing={1}>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <Stack key={stars} direction="row" alignItems="center" spacing={2}>
                    <Stack direction="row" spacing={0.5} sx={{ minWidth: 100 }}>
                      {[...Array(stars)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" color="primary" />
                      ))}
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={stars === 5 ? 70 : stars === 4 ? 20 : 10}
                      sx={{ flexGrow: 1, height: 8 }}
                    />
                    <Typography variant="body2" sx={{ minWidth: 40 }}>
                      {stars === 5 ? '70%' : stars === 4 ? '20%' : '10%'}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        
        <Stack spacing={3}>
          {reviews.map((review) => (
            <Paper key={review.id} sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Avatar src={review.avatar}>{review.name[0]}</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{review.name}</Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Typography variant="body1" paragraph>
                {review.comment}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  size="small"
                  startIcon={<ThumbUpIcon />}
                  variant="text"
                >
                  Helpful ({review.helpful})
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </TabPanel>
    </Container>
  );
}