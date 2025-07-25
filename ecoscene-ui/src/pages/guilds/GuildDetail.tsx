import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  InputAdornment,
  Badge,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  CalendarMonth as CalendarIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Settings as SettingsIcon,
  Forest as EcoIcon,
  FavoriteBorder as HeartIcon,
  WbSunny as SunIcon,
  Park as LeafIcon,
  Chat as ChatIcon,
  Event as EventIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  AttachFile as AttachFileIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  VideoLibrary as VideoIcon,
  Image as ImageIcon,
  Send as SendIcon,
  AdminPanelSettings as AdminIcon,
  HowToVote as VoteIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { mockGuilds, mockUsers, mockPosts } from '../../mocks/data';
import type { Post } from '../../mocks/data';

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
      id={`guild-tabpanel-${index}`}
      aria-labelledby={`guild-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function GuildDetail() {
  const { guildId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isMember, setIsMember] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  // Find the guild
  const guild = mockGuilds.find((g) => g.id === guildId);
  const currentUser = mockUsers[0]; // Simulating logged-in user

  // Get guild members (mock data)
  const managers = useMemo(() => {
    return guild?.leadership.managers.map(id => 
      mockUsers.find(u => u.id === id) || mockUsers[0]
    ) || [];
  }, [guild]);

  const votingMembers = useMemo(() => {
    return guild?.leadership.votingMembers.map(id => 
      mockUsers.find(u => u.id === id) || mockUsers[1]
    ) || [];
  }, [guild]);

  // Get guild posts
  const guildPosts = useMemo(() => {
    return mockPosts.filter(post => post.guild === guild?.name);
  }, [guild]);

  if (!guild) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Guild not found</Typography>
      </Container>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleJoinLeave = () => {
    setIsMember(!isMember);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePostSubmit = () => {
    // Handle post submission
    setNewPostContent('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Guild Header */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        {/* Banner */}
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${guild.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
              p: 3,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src={guild.avatar}
                alt={guild.name}
                sx={{ width: 100, height: 100, border: '4px solid white' }}
              />
              <Box>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {guild.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Chip
                    icon={<EcoIcon />}
                    label={guild.category}
                    size="small"
                    sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                  />
                  {guild.location && (
                    <Chip
                      icon={<LocationIcon />}
                      label={guild.location}
                      size="small"
                      sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white' }} onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ShareIcon sx={{ mr: 1 }} /> Share Guild
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <SettingsIcon sx={{ mr: 1 }} /> Guild Settings
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        {/* Guild Info */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {guild.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <strong>Mission:</strong> {guild.mission}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {guild.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon color="action" />
                  <Typography>{guild.members.toLocaleString()} members</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkIcon color="action" />
                  <Typography>{guild.projects} active projects</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon color="action" />
                  <Typography>Founded {new Date(guild.founded).toLocaleDateString()}</Typography>
                </Box>
                <Button
                  variant={isMember ? 'outlined' : 'contained'}
                  fullWidth
                  onClick={handleJoinLeave}
                  startIcon={isMember ? undefined : <PersonAddIcon />}
                >
                  {isMember ? 'Leave Guild' : 'Join Guild'}
                </Button>
                {isMember && (
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EventIcon />}
                    onClick={() => setScheduleDialogOpen(true)}
                  >
                    Schedule Meeting
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable">
          <Tab label="Feed" />
          <Tab label="Members" />
          <Tab label="Projects" />
          <Tab label="Resources" />
          <Tab label="About" />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {/* Feed Tab */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* New Post */}
            {isMember && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar src={currentUser.avatar} />
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Share something with the guild..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small">
                        <ImageIcon />
                      </IconButton>
                      <IconButton size="small">
                        <VideoIcon />
                      </IconButton>
                      <IconButton size="small">
                        <AttachFileIcon />
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={handlePostSubmit}
                      disabled={!newPostContent.trim()}
                    >
                      Post
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Posts */}
            {guildPosts.map((post) => (
              <Card key={post.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar src={post.author.avatar} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">
                        {post.author.fullName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(post.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {post.content}
                  </Typography>
                  {post.media && post.media.length > 0 && (
                    <CardMedia
                      component="img"
                      height="300"
                      image={post.media[0]}
                      alt="Post media"
                      sx={{ borderRadius: 1, mb: 2 }}
                    />
                  )}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button size="small" startIcon={<HeartIcon />}>
                      {post.reactions.hearts}
                    </Button>
                    <Button size="small" startIcon={<LeafIcon />}>
                      {post.reactions.leaves}
                    </Button>
                    <Button size="small" startIcon={<SunIcon />}>
                      {post.reactions.suns}
                    </Button>
                    <Button size="small" startIcon={<ChatIcon />}>
                      {post.comments}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Quick Stats */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Guild Activity
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Posts this week
                    </Typography>
                    <Typography variant="h4">23</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Active members
                    </Typography>
                    <Typography variant="h4">156</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Upcoming events
                    </Typography>
                    <Typography variant="h4">4</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Upcoming Events
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <EventIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Monthly Guild Meeting"
                      secondary="Tomorrow at 3:00 PM"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Regenerative Workshop"
                      secondary="Friday at 10:00 AM"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Members Tab */}
        <Grid container spacing={3}>
          {/* Managers */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AdminIcon color="primary" />
              Guild Managers ({managers.length})
            </Typography>
            <Grid container spacing={2}>
              {managers.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={member.avatar} sx={{ width: 60, height: 60 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1">{member.fullName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            @{member.username}
                          </Typography>
                          <Chip
                            icon={<AdminIcon />}
                            label="Manager"
                            size="small"
                            color="primary"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Voting Members */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <VoteIcon color="secondary" />
              Voting Members ({votingMembers.length})
            </Typography>
            <Grid container spacing={2}>
              {votingMembers.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={member.avatar} sx={{ width: 60, height: 60 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1">{member.fullName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            @{member.username}
                          </Typography>
                          <Chip
                            icon={<VoteIcon />}
                            label="Voting Member"
                            size="small"
                            color="secondary"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Regular Members */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon />
              All Members ({guild.members})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing a sample of guild members. Full member list would be paginated.
            </Typography>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Projects Tab */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <WorkIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Guild Projects
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Active projects and initiatives will be displayed here
          </Typography>
          {isMember && (
            <Button variant="contained" startIcon={<AddIcon />}>
              Create New Project
            </Button>
          )}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {/* Resources Tab */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon />
                  Documents
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'background.paper' }}>
                        <ArticleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Guild Charter"
                      secondary="Last updated 2 weeks ago"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'background.paper' }}>
                        <ArticleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Meeting Minutes"
                      secondary="Last updated 3 days ago"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinkIcon />
                  Useful Links
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'background.paper' }}>
                        <LinkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Guild Website"
                      secondary="www.example.com"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'background.paper' }}>
                        <LinkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Resource Library"
                      secondary="resources.example.com"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        {/* About Tab */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  About {guild.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {guild.description}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  {guild.mission}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                  Guild Values
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {guild.tags.map((tag) => (
                    <Chip key={tag} label={tag} color="primary" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Guild Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Founded
                    </Typography>
                    <Typography variant="body1">
                      {new Date(guild.founded).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="body1">{guild.category}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1">{guild.location || 'Global'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Members
                    </Typography>
                    <Typography variant="body1">{guild.members.toLocaleString()}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Active Projects
                    </Typography>
                    <Typography variant="body1">{guild.projects}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Schedule Meeting Dialog */}
      <Dialog open={scheduleDialogOpen} onClose={() => setScheduleDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Guild Meeting</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Meeting Title"
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Date & Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setScheduleDialogOpen(false)}>
            Schedule Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}