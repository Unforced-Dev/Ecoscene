import { Paper, Typography, Box, Card, CardContent, LinearProgress, Avatar, IconButton, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TrendingUp, Nature, Groups, School, EmojiEvents, ArrowForward } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { mockUsers, mockPosts, mockGuilds } from '../mocks/data';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, color, progress }: any) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ mb: 1 }}>
            {value}
          </Typography>
          {progress && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={progress} color={color} />
            </Box>
          )}
        </Box>
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark` }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user) || mockUsers[0];

  const stats = [
    { title: 'Impact Score', value: '2,450', icon: <TrendingUp />, color: 'primary', progress: 78 },
    { title: 'Trees Planted', value: user.impact.treesPlanted, icon: <Nature />, color: 'success' },
    { title: 'Active Guilds', value: user.guilds.length, icon: <Groups />, color: 'secondary' },
    { title: 'Courses Completed', value: '12', icon: <School />, color: 'info' },
  ];

  const currencies = [
    { type: 'V', label: 'Yin Currency', value: user.currencies.V, color: 'primary' },
    { type: 'Y', label: 'Yang Currency', value: user.currencies.Y, color: 'warning' },
    { type: 'Q', label: 'Equity Tokens', value: user.currencies.Q, color: 'secondary' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Welcome back, {user.fullName}!
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        {/* Wallet Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Wallet Overview</Typography>
              <IconButton size="small" onClick={() => navigate('/wallet')}>
                <ArrowForward />
              </IconButton>
            </Box>
            {currencies.map((currency) => (
              <Box key={currency.type} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {currency.label}
                  </Typography>
                  <Typography variant="h6">
                    {currency.value} {currency.type}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(currency.value / 5000) * 100} 
                  color={currency.color as any}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <IconButton size="small" onClick={() => navigate('/feed')}>
                <ArrowForward />
              </IconButton>
            </Box>
            {mockPosts.slice(0, 3).map((post) => (
              <Box key={post.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar src={post.author.avatar} sx={{ mr: 2, width: 32, height: 32 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2">{post.author.fullName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </Typography>
                  </Box>
                  {post.guild && (
                    <Chip label={post.guild} size="small" color="primary" variant="outlined" />
                  )}
                </Box>
                <Typography variant="body2" sx={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {post.content}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Active Guilds */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Your Guilds</Typography>
              <IconButton size="small" onClick={() => navigate('/guilds')}>
                <ArrowForward />
              </IconButton>
            </Box>
            {mockGuilds.filter(g => user.guilds.includes(g.name)).map((guild) => (
              <Box key={guild.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={guild.avatar} sx={{ mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{guild.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {guild.members} members • {guild.projects} projects
                  </Typography>
                </Box>
                <Chip label={guild.category} size="small" />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Achievements</Typography>
              <EmojiEvents color="warning" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <Nature />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">Earth Guardian</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Planted over 1000 trees
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Groups />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">Community Builder</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active in 3+ guilds
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <School />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">Knowledge Seeker</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed 10+ courses
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Suggested Connections */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Suggested Connections
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto' }}>
              {mockUsers.filter(u => u.id !== user.id).map((suggestedUser) => (
                <Card key={suggestedUser.id} sx={{ minWidth: 200, cursor: 'pointer' }} onClick={() => navigate(`/profile/${suggestedUser.id}`)}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar src={suggestedUser.avatar} sx={{ width: 60, height: 60, margin: '0 auto', mb: 1 }} />
                    <Typography variant="subtitle2">{suggestedUser.fullName}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {suggestedUser.location}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                      {suggestedUser.guilds.slice(0, 2).map((guild, idx) => (
                        <Chip key={idx} label={guild} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}