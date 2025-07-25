import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
  Card,
  CardContent,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Edit,
  Settings,
  PersonAdd,
  EmojiEvents,
  Nature,
  School,
  Groups,
  LocationOn,
  CalendarToday,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { mockUsers, mockPosts } from '../../mocks/data';

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

export default function Profile() {
  const { userId } = useParams();
  const currentUser = useSelector((state: RootState) => state.auth.user) || mockUsers[0];
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Get the profile user (if userId is provided, find that user, otherwise use current user)
  const profileUser = userId ? mockUsers.find(u => u.id === userId) || currentUser : currentUser;
  const isOwnProfile = profileUser.id === currentUser.id;
  
  // Get user's posts
  const userPosts = mockPosts.filter(post => post.author.id === profileUser.id);
  
  const [editForm, setEditForm] = useState({
    bio: profileUser.bio,
    location: profileUser.location,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditSubmit = () => {
    // In real app, would dispatch action to update user
    setEditDialogOpen(false);
  };

  return (
    <Box>
      {/* Profile Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <Avatar
              src={profileUser.avatar}
              sx={{ width: 150, height: 150, margin: '0 auto' }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" gutterBottom>
              {profileUser.fullName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              @{profileUser.username}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2">{profileUser.location}</Typography>
              <CalendarToday fontSize="small" color="action" sx={{ ml: 2 }} />
              <Typography variant="body2">
                Joined {new Date(profileUser.joinedDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {profileUser.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box>
                <Typography variant="h6">{profileUser.followers}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">{profileUser.following}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Following
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">{userPosts.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Posts
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            {isOwnProfile ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  fullWidth
                  onClick={() => setEditDialogOpen(true)}
                >
                  Edit Profile
                </Button>
                <Button variant="outlined" startIcon={<Settings />} fullWidth>
                  Settings
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant={isFollowing ? 'outlined' : 'contained'}
                  startIcon={<PersonAdd />}
                  fullWidth
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outlined" fullWidth>
                  Message
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Values & Personality */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Values & Personality
        </Typography>
        <Grid spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Gene Keys
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {profileUser.values.geneKeys.map((key) => (
                    <Chip key={key} label={`Key ${key}`} color="primary" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Human Design
                </Typography>
                <Typography variant="h6">{profileUser.values.humanDesign}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Enneagram
                </Typography>
                <Typography variant="h6">{profileUser.values.enneagram}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Impact & Achievements */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Impact & Achievements
        </Typography>
        <Grid spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <Nature />
              </Avatar>
              <Box>
                <Typography variant="h5">{profileUser.impact.treesPlanted}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Trees Planted
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Groups />
              </Avatar>
              <Box>
                <Typography variant="h5">{profileUser.impact.soilRestored}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Soil Restored
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <School />
              </Avatar>
              <Box>
                <Typography variant="h5">{profileUser.impact.peopleEducated}</Typography>
                <Typography variant="body2" color="text.secondary">
                  People Educated
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Certifications */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Certifications
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {profileUser.certifications.map((cert) => (
              <Chip
                key={cert}
                label={cert}
                icon={<EmojiEvents />}
                color="warning"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Tabs for Content */}
      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Posts" />
          <Tab label="Guilds" />
          <Tab label="Achievements" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {userPosts.map((post) => (
            <Card key={post.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1">{post.content}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  {post.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid spacing={2}>
            {profileUser.guilds.map((guild) => (
              <Grid size={{ xs: 12, md: 6 }} key={guild}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{guild}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active member
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <Nature />
                    </Avatar>
                    <Typography variant="h6">Earth Guardian</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Planted over 1000 trees
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{ mt: 2 }}
                    color="success"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Bio"
            multiline
            rows={4}
            value={editForm.bio}
            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}